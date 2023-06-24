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
  const { title, desc, img, categories, size, color, price, inStock } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        title,
        desc,
        img,
        categories: {
          set: categories,
        },
        size: {
          set: size,
        },
        color: {
          set: color,
        },
        price,
        inStock,
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
  const { title, desc, img, categories, size, color, price, inStock } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        title,
        desc,
        img,
        categories: {
          set: categories,
        },
        size: {
          set: size,
        },
        color: {
          set: color,
        },
        price,
        inStock,
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
    await prisma.product.delete({
      where: {
        id,
      },
    });

    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET PRODUCT
router.get("/find/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;

    if (qNew) {
      products = await prisma.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      });
    } else if (qCategory) {
      products = await prisma.product.findMany({
        where: {
          categories: {
            has: qCategory,
          },
        },
      });
    } else {
      products = await prisma.product.findMany();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
