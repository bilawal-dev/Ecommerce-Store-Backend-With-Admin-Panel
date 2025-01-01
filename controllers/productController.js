import prisma from "../database/db.config.js";

export async function getProducts(req, res) {
    let { page, limit } = req.query;

    if (!page || page <= 0) {
        page = 1;
    }

    if (!limit || limit <= 0) {
        limit = 10;
    }

    const skip = (page - 1) * limit;

    try {
        const products = await prisma.product.findMany({
            skip: skip,
            take: Number(limit),
            orderBy: {
                price: 'asc'
            }
        });

        const totalProducts = await prisma.product.count();
        const totalPages = Math.ceil(totalProducts / limit);

        res.status(200).json({ success: true, message: 'Products Recieved Successfully', meta: { totalProducts, totalPages }, products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function searchProducts(req, res) {
    const { search } = req.query;

    try {
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: search || '',
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: search || '',
                            mode: 'insensitive'
                        }
                    }
                ]
            }
        });

        res.status(200).json({ success: true, message: 'Products Recieved Successfully', products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function getCategoryProduct(req, res) {
    const { name } = req.params;

    if (!name) {
        res.status(400).json({ success: false, message: 'Category Name Not Found' });
    }

    try {
        const productsData = await prisma.category.findFirst({
            where: {
                name
            },
            include: {
                products: true
            },
        })

        res.status(200).json({ success: true, message: 'Products Recieved Successfully', products: productsData?.products || [] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function getRelatedProducts(req, res) {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ success: false, message: 'Product ID Not Found' });
    }

    try {
        const product = await prisma.product.findFirst({
            where: {
                id: Number(id)
            }
        });

        if (!product) {
            return res.status(400).json({ success: false, message: 'Product Not Found', products: [] });
        };

        console.log(product);

        const { products } = await prisma.category.findFirst({
            where: {
                name: product.category
            },
            include: {
                products: {
                    where: {
                        NOT: {
                            id: product.id
                        }
                    },
                    take: 4
                },
            }
        })

        res.status(200).json({ success: true, message: 'Related Products Recieved Successfully', products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function getSingleProduct(req, res) {
    const { id } = req.params;

    if (!id || !Number(id)) {
        return res.status(400).json({ success: false, message: 'Product ID Not Found' });
    }

    try {
        const product = await prisma.product.findFirst({
            where: {
                id: Number(id)
            }
        });

        res.status(200).json({ success: true, message: 'Product Recieved Successfully', product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}