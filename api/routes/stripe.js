const { PrismaClient } = require("@prisma/client");
const stripe = require("stripe")("sk_test_51NKOC3IP0saOLRhOpP5xyHMVEag7tfJHo5cyZWEl2tCAqDVIHbNve55nAwHhZeJheCzxZ8ZPb2lXqcufW1hxAFYo003kMP3IRZ");

const prisma = new PrismaClient();
const router = require("express").Router();

router.post("/payment", async (req, res) => {
  const { tokenId, amount } = req.body;

  try {
    const stripeRes = await stripe.charges.create({
      source: tokenId,
      amount,
      currency: "usd", // dollar
    });

    const payment = await prisma.payment.create({
      data: {
        tokenId,
        amount,
        currency: "usd",
        status: stripeRes.status,
        // Outros campos relevantes do pagamento
      },
    });

    res.status(200).json(payment);
  } catch (stripeErr) {
    res.status(500).json(stripeErr);
  }
});

module.exports = router;
