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
    const [presence, setPresence] = useState({
        totalLiveCount: 0,
        liveStudentsCount: 0,
        onlineStudentNames: [],
        totalRegistered: 0
    });

    // Initialize Socket.io instance once
    useEffect(() => {
        const socketServerUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '/';
        const socketInstance = io(socketServerUrl, {
            transports: ['websocket', 'polling']
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
            if (data) {
                setPresence({
                    totalLiveCount: data.totalLiveCount || 0,
                    liveStudentsCount: data.liveStudentsCount || 0,
                    onlineStudentNames: Array.isArray(data.onlineStudentNames) ? data.onlineStudentNames : [],
                    totalRegistered: data.totalRegistered || 0
                });
            }
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
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
