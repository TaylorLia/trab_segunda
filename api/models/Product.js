const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  createProduct: async (title, desc, img, categories, size, color, price, inStock = true) => {
    const product = await prisma.product.create({
      data: {
        title,
        desc,
        img,
        categories,
        size,
        color,
        price,
        inStock,
      },
    });

    return product;
  },

  getProductById: async (productId) => {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    return product;
  },
};
