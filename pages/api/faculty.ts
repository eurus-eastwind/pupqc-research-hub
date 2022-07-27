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
  const faculty = await prisma.user.findMany({
    where: { role: "FACULTY" },
    select: prisma.$exclude("user", ["password", "course"]),
  });

  return res.json({
    status: "success",
    message: "Successfull retrieved faculties",
    faculty,
    count: faculty.length,
  });
});

export default handler;
