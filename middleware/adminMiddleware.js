export async function adminMiddleware(req, res, next) {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(400).json({ success: false, message: 'Only Admins are allowed to access this route' });
        }

        next();
    } catch (error) {
        res.status(500).json({ success: false, message: 'User Is Unauthenticated' });
    }
}