const { PrismaClient } = require("@prisma/client");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const prisma = new PrismaClient();

const router = require("express").Router();

// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const { NOME, DESCRICAO, PRECO, IMAGEM, CATEGORIA } = req.body;

  try {
    const newProduct = await prisma.produto.create({
      data: {
        NOME,
        DESCRICAO,
        PRECO,
        IMAGEM,
        CATEGORIA,
      },
    });

    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  const { id } = req.params;
  const { NOME, DESCRICAO, PRECO, IMAGEM, CATEGORIA } = req.body;

  try {
    const updatedProduct = await prisma.produto.update({
      where: {
        id,
      },
      data: {
        NOME,
        DESCRICAO,
        PRECO,
        IMAGEM,
        CATEGORIA,
      },
    });

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.produto.delete({
      where: {
        id,
      },
    });

    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const products = await prisma.produto.findMany();

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
