import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('techkarma_user');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            return null;
        }
    });

    const [token, setToken] = useState(() => localStorage.getItem('techkarma_token') || null);
    const [socket, setSocket] = useState(null);
    // Base boost configurations for counter cards (Active Live: 30 base, Total Visits: 600 base)
    const BASE_LIVE_BOOST = 30;      // Base 30 + active live visitors
    const BASE_VISITS_BOOST = 600;   // Base 600 + subsequent visits

    const [presence, setPresence] = useState(() => {
        let initialVisits = 0;
        try {
            initialVisits = parseInt(localStorage.getItem('techkarma_new_visits') || '0', 10);
        } catch (e) {}
        return {
            totalLiveCount: BASE_LIVE_BOOST + 1, // Base 30 + 1 current live session = 31 Live
            liveStudentsCount: user ? 1 : 0,
            onlineStudentNames: user ? [user.name] : [],
            totalRegistered: 0,
            totalVisits: BASE_VISITS_BOOST + initialVisits
        };
    });

    // Real Cross-Tab and Visit Tracker
    useEffect(() => {
        let isMounted = true;
        const myTabId = Math.random().toString(36).substring(2, 9);
        const activeTabs = new Set([myTabId]);

        // Track visits in localStorage starting from base 600
        try {
            const currentVisits = parseInt(localStorage.getItem('techkarma_new_visits') || '0', 10) + 1;
            localStorage.setItem('techkarma_new_visits', currentVisits.toString());
            if (isMounted) {
                setPresence(prev => ({ ...prev, totalVisits: BASE_VISITS_BOOST + currentVisits }));
            }
        } catch (e) {}

        // BroadcastChannel to count real open tabs in real-time
        let channel = null;
        try {
            channel = new BroadcastChannel('techkarma_real_presence');
            channel.postMessage({ type: 'PING', tabId: myTabId });

            channel.onmessage = (event) => {
                if (!event.data) return;
                if (event.data.type === 'PING') {
                    activeTabs.add(event.data.tabId);
                    channel.postMessage({ type: 'PONG', tabId: myTabId });
                } else if (event.data.type === 'PONG') {
                    activeTabs.add(event.data.tabId);
                } else if (event.data.type === 'CLOSE') {
                    activeTabs.delete(event.data.tabId);
                }
                if (isMounted) {
                    setPresence(prev => ({
                        ...prev,
                        totalLiveCount: BASE_LIVE_BOOST + Math.max(1, activeTabs.size)
                    }));
                }
            };
        } catch (e) {}

        // Fetch stats from server if database is connected
        const fetchServerStats = async () => {
            try {
                const res = await fetch('/api/stats');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.success && isMounted) {
                        const visits = data.totalVisits || parseInt(localStorage.getItem('techkarma_new_visits') || '0', 10);
                        setPresence(prev => ({
                            ...prev,
                            totalRegistered: data.totalUsers || 0,
                            totalVisits: BASE_VISITS_BOOST + visits
                        }));
                    }
                }
            } catch (e) {}
        };
        fetchServerStats();

        // Increment visit count on server if available
        try {
            fetch('/api/stats/visit', { method: 'POST' }).catch(() => {});
        } catch (e) {}

        return () => {
            isMounted = false;
            if (channel) {
                try {
                    channel.postMessage({ type: 'CLOSE', tabId: myTabId });
                    channel.close();
                } catch (e) {}
            }
        };
    }, []);

    // Initialize Socket.io instance if server supports it
    useEffect(() => {
        const socketServerUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '/';
        let socketInstance = null;
        try {
            socketInstance = io(socketServerUrl, {
                transports: ['websocket', 'polling'],
                reconnectionAttempts: 3,
                timeout: 5000
            });

            socketInstance.on('connect', () => {
                const savedUser = localStorage.getItem('techkarma_user');
                if (savedUser) {
                    try {
                        const parsed = JSON.parse(savedUser);
                        if (parsed && parsed._id && parsed.name) {
                            socketInstance.emit('user_online', {
                                userId: parsed._id,
                                name: parsed.name,
                                showInOnlineList: parsed.showInOnlineList !== false
                            });
                        }
                    } catch (e) {}
                }
            });

            socketInstance.on('livePresenceUpdate', (data) => {
                if (data && (data.totalLiveCount > 0 || data.totalRegistered > 0)) {
                    setPresence(prev => ({
                        ...prev,
                        totalLiveCount: BASE_LIVE_BOOST + (data.totalLiveCount || 1),
                        liveStudentsCount: data.liveStudentsCount || prev.liveStudentsCount,
                        onlineStudentNames: Array.isArray(data.onlineStudentNames) && data.onlineStudentNames.length > 0
                            ? data.onlineStudentNames
                            : prev.onlineStudentNames,
                        totalRegistered: data.totalRegistered !== undefined ? data.totalRegistered : prev.totalRegistered
                    }));
                }
            });

            setSocket(socketInstance);
        } catch (e) {}

        return () => {
            if (socketInstance) socketInstance.disconnect();
        };
    }, []);

    // Keep socket presence in sync with user state
    useEffect(() => {
        if (socket && socket.connected) {
            if (user && user._id) {
                socket.emit('user_online', {
                    userId: user._id,
                    name: user.name,
                    showInOnlineList: user.showInOnlineList !== false
                });
            }
        }
    }, [user, socket]);

    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('techkarma_user', JSON.stringify(userData));
        localStorage.setItem('techkarma_token', userToken);

        if (socket && socket.connected && userData) {
            socket.emit('user_online', {
                userId: userData._id,
                name: userData.name,
                showInOnlineList: userData.showInOnlineList !== false
            });
        }
    };

    const logout = () => {
        if (socket && socket.connected && user) {
            socket.emit('user_offline', { userId: user._id });
        }
        setUser(null);
        setToken(null);
        localStorage.removeItem('techkarma_user');
        localStorage.removeItem('techkarma_token');
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isLoggedIn: !!user,
            isAdmin: user?.role === 'admin',
            login,
            logout,
            presence,
            socket
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
