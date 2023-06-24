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
  const { USUARIO_ID, VLR_TOTAL, STATUS, Carrinho } = req.body;

  try {
    const newOrder = await prisma.pedido.create({
      data: {
        USUARIO_ID,
        VLR_TOTAL,
        STATUS,
        Carrinho: {
          create: Carrinho,
        },
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
  const { USUARIO_ID, VLR_TOTAL, STATUS, Carrinho } = req.body;

  try {
    const updatedOrder = await prisma.pedido.update({
      where: {
        id,
      },
      data: {
        USUARIO_ID,
        VLR_TOTAL,
        STATUS,
        Carrinho: {
          set: Carrinho,
        },
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
    await prisma.pedido.delete({
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
    const orders = await prisma.pedido.findMany({
      where: {
        USUARIO_ID: userId,
      },
      include: {
        Carrinho: true,
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
    const orders = await prisma.pedido.findMany({
      include: {
        Carrinho: true,
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
    const income = await prisma.pedido.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: previousMonth,
        },
      },
      _sum: {
        VLR_TOTAL: true,
      },
    });

    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
