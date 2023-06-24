const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  createCart: async (userId) => {
    const cart = await prisma.cart.create({
      data: {
        userId,
      },
    });

    return cart;
  },
  
  addToCart: async (cartId, productId, quantity = 1) => {
    const cartItem = await prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
      },
    });

    return cartItem;
  },
  
  getCartById: async (cartId) => {
    const cart = await prisma.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        cartItems: true,
      },
    });

    return cart;
  },
};
