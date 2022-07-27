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

handler.delete(async (req, res) => {
  const { id } = req.query;

  await prisma.application.delete({ where: { id: Number(id) } });

  return res.json({
    status: "success",
    message: "Successfully delete application",
  });
});

handler.put(async (req, res) => {
  const { id } = req.query;

  const application = await prisma.application.update({
    where: { id: Number(id) },
    data: req.body,
  });

  return res.status(201).json({
    status: "success",
    message: "Application updated successfully",
    application,
  });
});

export default handler;
