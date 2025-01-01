import prisma from "../database/db.config.js";

export async function getAllCategories(req, res) {
    try {
        const categories = await prisma.category.findMany({})

        res.status(200).json({ success: true, message: 'Categories Recieved Successfully', categories });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}