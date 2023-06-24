const { PrismaClient } = require("@prisma/client");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const prisma = new PrismaClient();

const router = require("express").Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
  const { userId, products, amount, address, status } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        userId,
        products: {
          create: products,
        },
        amount,
        address,
        status,
      },
    });

    res.status(200).json(newOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  const { id } = req.params;
  const { products, amount, address, status } = req.body;

  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id,
      },
      data: {
        products: {
          set: products,
        },
        amount,
        address,
        status,
      },
    });

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.order.delete({
      where: {
        id,
      },
    });

    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        products: true,
      },
    });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        products: true,
      },
    });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await prisma.order.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: previousMonth,
        },
      },
      _sum: {
        amount: true,
      },
    });

    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
