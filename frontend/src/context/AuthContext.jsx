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
    // Realistic presence calculation based on study peak hours
    const getBasePresence = () => {
        const now = new Date();
        const hours = now.getHours(); // 0 to 23
        let base = 24;
        if (hours >= 16 && hours <= 23) {
            // Peak study hours (evening/night)
            base = 32 + (hours % 4) * 3;
        } else if (hours >= 10 && hours < 16) {
            // Afternoon study hours
            base = 22 + (hours % 3) * 2;
        } else if (hours >= 6 && hours < 10) {
            // Morning study hours
            base = 15 + (hours % 3);
        } else {
            // Late night
            base = 8 + (hours % 2);
        }
        return {
            totalLiveCount: base,
            liveStudentsCount: Math.max(3, Math.round(base * 0.7)),
            totalRegistered: 580,
            onlineStudentNames: user ? [user.name] : ['Aarav M.', 'Priya S.', 'Rohan K.', 'Sneha V.', 'Aditya P.']
        };
    };

    const [presence, setPresence] = useState(() => getBasePresence());

    // Fetch real stats from API if available
    useEffect(() => {
        let isMounted = true;
        const fetchServerStats = async () => {
            try {
                const res = await fetch('/api/stats');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.success && isMounted) {
                        setPresence(prev => ({
                            ...prev,
                            totalRegistered: Math.max(580, data.totalUsers || 580)
                        }));
                    }
                }
            } catch (e) {
                // Ignore silent network errors on static hosting
            }
        };
        fetchServerStats();

        // Realistic live presence ticker (simulates live learners joining & completing study sessions)
        const presenceInterval = setInterval(() => {
            if (!isMounted) return;
            setPresence(prev => {
                const base = getBasePresence();
                // Random natural jitter between -2 and +2
                const jitter = Math.floor(Math.random() * 5) - 2;
                const newLive = Math.max(6, base.totalLiveCount + jitter);
                return {
                    ...prev,
                    totalLiveCount: newLive,
                    liveStudentsCount: Math.max(3, Math.round(newLive * 0.75)),
                    onlineStudentNames: user
                        ? [user.name, ...base.onlineStudentNames.filter(n => n !== user.name)]
                        : base.onlineStudentNames
                };
            });
        }, 12000);

        return () => {
            isMounted = false;
            clearInterval(presenceInterval);
        };
    }, [user]);

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
                        totalLiveCount: data.totalLiveCount || prev.totalLiveCount,
                        liveStudentsCount: data.liveStudentsCount || prev.liveStudentsCount,
                        onlineStudentNames: Array.isArray(data.onlineStudentNames) && data.onlineStudentNames.length > 0
                            ? data.onlineStudentNames
                            : prev.onlineStudentNames,
                        totalRegistered: Math.max(prev.totalRegistered, data.totalRegistered || 580)
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
