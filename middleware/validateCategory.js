import zod from 'zod';

const categorySchema = zod.object({
    name: zod.string({ message: 'Please Provide Category Name' }),
});

export const validateCategory = (req, res, next) => {
    try {
        const result = categorySchema.parse(req.body);

        next();
    } catch (error) {
        res.status(400).json({ success: false, message: error.issues[0].message });
    }
}