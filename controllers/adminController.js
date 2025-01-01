import prisma from "../database/db.config.js";

export async function createCategory(req, res) {
    const { name } = req.body;

    try {
        const categoryExists = await prisma.category.findFirst({
            where: {
                name
            }
        })

        if (categoryExists) {
            return res.status(400).json({ success: false, message: 'Category Already Exists' });
        }

        await prisma.category.create({
            data: {
                name
            }
        })

        res.status(200).json({ success: true, message: 'Category Created Successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function deleteCategory(req, res) {
    const { name } = req.params;

    if (!name) {
        return res.status(400).json({ success: false, message: 'Category ID Not Found' });
    }

    try {
        await prisma.category.delete({
            where: {
                name
            }
        })

        res.status(200).json({ success: true, message: 'Category Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function createProduct(req, res) {
    const { name, description, price, category } = req.body;

    try {
        const categoryExists = await prisma.category.findFirst({
            where: {
                name: category
            }
        });

        if (!categoryExists) {
            res.status(400).json({ success: false, message: 'Category Does Not Exist' });
        }

        await prisma.product.create({
            data: {
                name,
                description,
                price,
                category
            }
        })

        await prisma.category.update({
            where: {
                name: category
            },
            data: {
                productCount: {
                    increment : 1
                }
            }
        })

        res.status(200).json({ success: true, message: 'Product Created Successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function deleteProduct(req, res) {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ success: false, message: 'Product ID Not Found' });
    }

    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                id: Number(id)
            }
        })

        await prisma.category.update({
            where: {
                name: deletedProduct.category
            },
            data: {
                productCount: {
                    decrement : 1
                }
            }
        })

        res.status(200).json({ success: true, message: 'Product Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}