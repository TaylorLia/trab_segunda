const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = async (req, res, next) => {
  verifyToken(req, res, async () => {
    const { id } = req.params;
    const { isAdmin } = req.user;

    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        return res.status(404).json("User not found");
      }

      if (user.id === req.user.id || isAdmin) {
        next();
      } else {
        res.status(403).json("You are not allowed to do that!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
};

const verifyTokenAndAdmin = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      const { isAdmin } = req.user;

      if (isAdmin) {
        next();
      } else {
        res.status(403).json("You are not allowed to do that!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
