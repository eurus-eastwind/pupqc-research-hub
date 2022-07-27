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

handler.post(async (req, res) => {
  const document = await prisma.documents.create({
    data: req.body,
  });

  return res.status(201).json({
    status: "success",
    message: "Document created successfully",
    document,
  });
});

handler.get(async (req, res) => {
  const { role } = req.query;

  //@ts-ignore
  const document = await prisma.documents.findMany({ where: { role } });

  return res.json({
    status: "success",
    message: "Successfully retrieved documents",
    document,
    count: document.length,
  });
});

export default handler;
