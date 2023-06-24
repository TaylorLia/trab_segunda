const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const prisma = new PrismaClient();

// REGISTER
router.post("/register", async (req, res) => {

  const {
    nome,
    email,
    username,
    cpf,
    fone,
    endereco,
    cidade,
    bairro,
    cep,
    numero,
    senha
  } = req.body;
try {
  const user = await prisma.usuario.create({
    data : {
      nome : nome,
      email : email,
      usuario : username,
      cpf : cpf,
      fone : fone,
      endereco : endereco,
      cidade : cidade,
      bairro : bairro,
      cep : cep,
      numero : Number(numero),
      senha: CryptoJS.AES.encrypt(
            senha,
            process.env.PASS_SEC
          ).toString(),
    }
  })
  res.status(201).json(user);
} catch (error) {
  console.log(error)
  res.status(500).json({erro :  error});
}finally{
  await prisma.$disconnect();
}

});

//LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await prisma.usuario.findFirst({
      where : {
        usuario : req.username
      }
    })

    !user && res.status(401).json("Usuario não encontrado");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.senha,
      process.env.PASS_SEC
  );
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      const inputPassword = req.body.password;        
      originalPassword != inputPassword &&
      res.status(401).json("Senha invalida");

      const accessToken = jwt.sign(
        {
            id: user.id,
            isAdmin: user.is_adm,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );

        res.status(200).json({...user, accessToken});
  } catch (error) {
    console.log(error)
    res.status(500).json({error});
  }  
  
  // try{

      
  //       const user = await User.findOne(
  //           {
  //               userName: req.body.user_name
  //           }
  //       );

  //       !user && res.status(401).json("Wrong User Name");

  //       const hashedPassword = CryptoJS.AES.decrypt(
  //           user.password,
  //           process.env.PASS_SEC
  //       );

        


  //       const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

  //       const inputPassword = req.body.password;
        
  //       originalPassword != inputPassword &&
  //           res.status(401).json("Wrong Password");

  //       const accessToken = jwt.sign(
  //       {
  //           id: user._id,
  //           isAdmin: user.isAdmin,
  //       },
  //       process.env.JWT_SEC,
  //           {expiresIn:"3d"}
  //       );
  
  //       const { password, ...others } = user._doc;  
  //       res.status(200).json({...others, accessToken});

  //   }catch(err){
  //       res.status(500).json(err);
  //   }

});

module.exports = router;
