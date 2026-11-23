import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]?.trim();
            if (!token) {
                return res.status(401).json({ message: 'Not authorized, no token' });
            }

            // Direct support for master admin offline token
            if (token === 'sonu_admin_master_token_2026') {
                req.user = { id: 'admin_sonu_kumar', role: 'admin' };
                return next();
            }

            const secret = process.env.JWT_SECRET || 'supersecretjwtkey_2026techkarma';
            const decoded = jwt.verify(token, secret);
            req.user = decoded; // { id, role }
            return next();
        } catch (error) {
            console.error('Auth protect error:', error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    return res.status(401).json({ message: 'Not authorized, no token' });
};

export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Not authorized as an admin' });
};
