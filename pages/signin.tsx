import React from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Center,
  Group,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";
import LoginBG from "@/assets/login-bg.png";
import Logo from "public/logo.png";
import PUP from "@/assets/pup-logo-big.png";
import { GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import { BrandFacebook, BrandGoogle } from "tabler-icons-react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

interface signinPageProps {
  providers: typeof getProviders;
}

const socials = new Map([
  [
    "Facebook",
    [
      // eslint-disable-next-line react/jsx-key
      <BrandFacebook size={18} />,
      "blue",
    ],
  ],
  [
    "Google",
    [
      // eslint-disable-next-line react/jsx-key
      <BrandGoogle size={18} />,
      "red",
    ],
  ],
]);

const schema = z.object({
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z.string(),
});

const SigninPage: React.FC<signinPageProps> = ({ providers }) => {
  // console.log(providers);
  const router = useRouter();
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const user = await signIn("credentials", {
        redirect: false,
        email,
        password,
        // callbackUrl: `${router.basePath}/api/signin`,
      });

      if (!user?.ok) {
        form.setFieldError("password", "Incorrect Password");
      }
    } catch (error) {
      router.reload();
      console.error(error);
    }
  };

  return (
    <Group sx={{ height: "100vh" }}>
      <Box
        sx={(theme) => ({
          flex: 2,
          backgroundImage: `url(${LoginBG.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundColor: theme.colors.gray[0],
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <Image
          src={Logo}
          alt="PUPQC Research Hub logo"
          height={350}
          width={250}
        />
      </Box>
      <Stack
        p="xl"
        justify="center"
        align="center"
        spacing={40}
        sx={(theme) => ({ flex: 1 })}
      >
        <Image src={PUP} alt="PUP logo" height={100} width={100} />
        <Box>
          <Title order={2}>Login to your account</Title>
          <Space h="xl" />
          <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
              radius="md"
              placeholder="Email"
              variant="filled"
              sx={{ width: "100%" }}
              required
              {...form.getInputProps("email")}
            />
            <Space h="xs" />
            <TextInput
              radius="md"
              placeholder="Password"
              type="password"
              variant="filled"
              sx={{ width: "100%" }}
              required
              {...form.getInputProps("password")}
            />
            <Space h="xs" />
            <Button
              type="submit"
              radius="md"
              fullWidth
              styles={(theme) => ({
                root: {
                  backgroundColor: theme.colors.maroon[0],
                  "&:hover": { backgroundColor: theme.colors.maroon[1] },
                },
              })}
            >
              Login
            </Button>
          </form>
          <Space h="md" />
          <Center>
            <Text size="xs" weight="bold">
              OR
            </Text>
          </Center>
          <Space h="md" />
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              {provider.name !== "Credentials" && (
                <>
                  <Button
                    variant="light"
                    color={`${socials.get(provider.name)?.[1]}`}
                    leftIcon={socials.get(provider.name)?.[0]}
                    fullWidth
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </Button>
                  <Space h="xs" />
                </>
              )}
            </div>
          ))}
        </Box>
      </Stack>
    </Group>
  );
};

export default SigninPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: { providers: await getProviders() } };
};
