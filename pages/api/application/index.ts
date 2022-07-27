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
  const { userId } = req.query;
  //@ts-ignore
  const application = await prisma.application.findMany({ where: { userId } });

  return res.json({
    status: "success",
    message: "Successfully retrieved applications",
    application,
    count: application.length,
  });
});

handler.post(async (req, res) => {
  const { userId, title, course, authors, applicantType } = req.body;
  const application = await prisma.application.create({
    data: {
      title,
      course,
      authors,
      applicantType,
      user: { connect: { id: userId } },
    },
  });

  return res.status(201).json({
    status: "success",
    message: "Application created successfully",
    application,
  });
});

export default handler;
