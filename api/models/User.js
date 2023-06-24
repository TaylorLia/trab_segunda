const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  createUser: async (username, email, password, isAdmin = false) => {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
        isAdmin,
      },
    });

    return user;
  },

  getUserById: async (userId) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  },
};
