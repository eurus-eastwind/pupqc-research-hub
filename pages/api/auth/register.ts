import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { prisma } from "@/utils/db";

const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { password } = req.body;

    const salt = 10;
    const hashePassword = await bcrypt.hash(password, salt);

    const user = (await prisma.user.create({
      data: {
        ...req.body,
        password: hashePassword,
      },
    })) as User;

    res.status(201).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    return res.status(409).json({
      status: "fail",
      message: "Email already exist, please use another email address",
    });
  }
};

export default registerUser;
