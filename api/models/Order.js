const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  createOrder: async (userId, products, amount, address, status = "pending") => {
    const order = await prisma.order.create({
      data: {
        userId,
        products: {
          create: products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
        },
        amount,
        address,
        status,
      },
    });

    return order;
  },

  getOrderById: async (orderId) => {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        products: true,
      },
    });

    return order;
  },
};

