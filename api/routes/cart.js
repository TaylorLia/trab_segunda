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
  const { PEDIDO_ID, PRODUTO_ID, QTDE, VLR_UNITARIO } = req.body;

  try {
    const newCart = await prisma.carrinho.create({
      data: {
        PEDIDO_ID,
        PRODUTO_ID,
        QTDE,
        VLR_UNITARIO,
      },
    });

    res.status(200).json(newCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const { id } = req.params;
  const { PRODUTO_ID, QTDE, VLR_UNITARIO } = req.body;

  try {
    const updatedCart = await prisma.carrinho.update({
      where: {
        id,
      },
      data: {
        PRODUTO_ID,
        QTDE,
        VLR_UNITARIO,
      },
    });

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.carrinho.delete({
      where: {
        id,
      },
    });

    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await prisma.carrinho.findFirst({
      where: {
        userId,
      },
      include: {
        Pedido: true,
        Produto: true,
      },
    });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await prisma.carrinho.findMany({
      include: {
        Pedido: true,
        Produto: true,
      },
    });

    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
