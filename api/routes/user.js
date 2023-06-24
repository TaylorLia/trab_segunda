const { PrismaClient } = require("@prisma/client");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const prisma = new PrismaClient();

const router = require("express").Router();

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const { id } = req.params;
  let { SENHA, ...userData } = req.body;

  if (SENHA) {
    SENHA = CryptoJS.AES.encrypt(SENHA, process.env.PASS_SEC).toString();
    userData = {
      ...userData,
      SENHA,
    };
  }

  try {
    const updatedUser = await prisma.usuario.update({
      where: {
        id,
      },
      data: userData,
    });

    const { SENHA: omitPassword, ...others } = updatedUser;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.usuario.delete({
      where: {
        id,
      },
    });

    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.usuario.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        NOME: true,
        USUARIO: true,
        EMAIL: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;

  try {
    let users;

    if (query) {
      users = await prisma.usuario.findMany({
        orderBy: {
          id: "desc",
        },
        take: 5,
      });
    } else {
      users = await prisma.usuario.findMany();
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await prisma.usuario.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: lastYear,
        },
      },
      _count: {
        createdAt: true,
      },
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
