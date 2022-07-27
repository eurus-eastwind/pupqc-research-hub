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
  const student = await prisma.user.findMany({
    where: { role: "STUDENT" },
    select: prisma.$exclude("user", ["password", "position"]),
  });

  return res.json({
    status: "success",
    message: "Successfull retrieved students",
    student,
    count: student.length,
  });
});

export default handler;
