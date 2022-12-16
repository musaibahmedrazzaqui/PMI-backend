const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
router.get("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        userID: Number(id),
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/user/register", async (req, res, next) => {
  try {
    // const data = req.body;
    const user = await prisma.user.create({
      data: req.body,
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
