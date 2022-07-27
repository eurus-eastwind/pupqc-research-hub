import { api } from "@/utils/axios";
import { User } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

export function protectedRoute(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      authOptions
    );

    if (!session) {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }

    // @ts-ignore
    ctx.req.user = session.user;

    return await gssp(ctx);
  };
}
