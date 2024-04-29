import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const prismaGet = async (req, res) => {
    const product = await  prisma.product.findMany();

    res.json(product);
}

export const prismaCreate = async (req, res) => {
    const product = await  prisma.product.create(
        {
            data: {
                name: "Product 1",
                price: 1000,
                stock: 10,
                categoryId: 1
                
            }
        }
    )

    res.json(product);
}