import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const prismaFunction = async (req, res) => {
    const product = await  prisma.product.findMany();

    res.json(product);
}