const { PrismaClient } = require("@prisma/client");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const router = require("express").Router();

const prisma = new PrismaClient();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {

  const {
    nome,
    descricao,
    preco,
    imagem,
    categoria
  } = req.body

try {  
  const produto = await prisma.produto.create({
    data : {
      nome,
      descricao,
      preco : parseFloat(preco),
      imagem,
      categoria
    }
  })

  res.status(200).json(produto)

} catch (error) {
  console.log(error);
  res.status(500).json(error)
} finally {
  await prisma.$disconnect()
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

  // products = await Product.find({
  //   categories: {
  //     $in: [qCategory],
  //   },
  // });

  
  const qCategory = req.query.category;

  try {
    let products;
     if (qCategory) {
      products = await prisma.produto.findMany({
        where : {
          categoria : qCategory
        }
      })
    } else {
      products = await prisma.produto.findMany()
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
