import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { prisma } from "@/utils/db";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

handler.get(async (req, res) => {
  const { email } = req.query;
  const user = await prisma.user.findFirst({
    where: { email: email as string },
    select: prisma.$exclude("user", ["password"]),
  });

  return res.json({
    status: "success",
    message: "Successfull retrieved user",
    user,
  });
});

handler.put(async (req, res) => {
  const { email } = req.query;
  const user = await prisma.user.update({
    where: { email: email as string },
    data: req.body,
  });

  return res.json({
    status: "success",
    message: "Successfull update user",
    user,
  });
});

handler.delete(async (req, res) => {
  const { email } = req.query;
  await prisma.user.delete({ where: { email: email as string } });

  return res.json({
    status: "success",
    message: "Successfull delete user",
  });
});

export default handler;
