import {
  Box,
  Button,
  List,
  Modal,
  Paper,
  Space,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Settings, User as UserIcon } from "tabler-icons-react";

interface profileMenuProps {
  styles: any;
  onClick?: React.MouseEventHandler;
  currentUser: User;
}

let links = [{ name: "Profile", to: "/profile", icon: <UserIcon size={14} /> }];

const ProfileMenu: React.FC<profileMenuProps> = ({
  styles,
  onClick,
  currentUser,
}) => {
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      course: "",
      position: "",
      password: "",
    },
  });

  useEffect(() => {
    form.setValues({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      course: currentUser?.course || "",
      position: currentUser?.position || "",
      password: "asdasdasdasd",
    });
  }, [currentUser]);

  const onSubmit = async (values: typeof form.values) => {
    form.reset();
    setOpened(false);
  };
  return (
    <>
      <Paper
        radius="md"
        withBorder
        style={{
          ...styles,
          position: "absolute",
          top: 45,
          right: 10,
          width: "15rem",
        }}
      >
        <Space h="xs" />
        {links.map((li) => (
          <Box key={li.name}>
            <List
              p="sm"
              pl="lg"
              center
              sx={(theme) => ({
                cursor: "pointer",
                width: "100%",
                "&:hover": { background: theme.colors.gray[0] },
              })}
            >
              <List.Item
                icon={
                  <ThemeIcon
                    size={24}
                    sx={() => ({
                      background: "transparent",
                      color: "black",
                    })}
                  >
                    {li.icon}
                  </ThemeIcon>
                }
                onClick={() => setOpened(true)}
              >
                {li.name}
              </List.Item>
            </List>
          </Box>
        ))}
        <Box p="sm">
          <Button
            fullWidth
            variant="light"
            color="red"
            onClick={() => signOut()}
          >
            Logout
          </Button>
        </Box>
      </Paper>
      <Modal
        size="lg"
        radius="md"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Profile"
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            radius="md"
            label="Name"
            placeholder="Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            radius="md"
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          {currentUser?.role === "STUDENT" ? (
            <TextInput
              radius="md"
              label="Course"
              placeholder="Course"
              {...form.getInputProps("course")}
            />
          ) : (
            <TextInput
              radius="md"
              label="Position"
              placeholder="Position"
              {...form.getInputProps("position")}
            />
          )}
          <TextInput
            radius="md"
            type="password"
            defaultValue="asdasdasdasd"
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <Space h="md" />
          <Button
            fullWidth
            type="submit"
            variant="light"
            color="red"
            radius="md"
          >
            Submit
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default ProfileMenu;
