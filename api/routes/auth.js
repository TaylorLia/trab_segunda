const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

// REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.PASS_SEC
    ).toString();

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: encryptedPassword,
      },
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { user_name, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        userName: user_name,
      },
    });

    if (!user) {
      return res.status(401).json("Wrong User Name");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword = password;

    if (originalPassword !== inputPassword) {
      return res.status(401).json("Wrong Password");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password: _, ...others } = user;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
