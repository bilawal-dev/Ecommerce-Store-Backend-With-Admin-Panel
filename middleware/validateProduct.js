import zod from 'zod';

const productSchema = zod.object({
    name: zod.string({ message: 'Please Provide Product Name' }),
    description: zod.string({ message: 'Please Provide Product Description' }),
    price: zod.number({ message: 'Please Provide Product Price' }),
    category: zod.string({ message: 'Please Provide Product Category' }),
});

export const validateProduct = (req, res, next) => {
    try {
        const result = productSchema.parse(req.body);

        next();
    } catch (error) {
        res.status(400).json({ success: false, message: error.issues[0].message });
    }
}