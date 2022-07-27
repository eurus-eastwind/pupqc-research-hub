import React, { useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "@/assets/logo-h.png";
import {
  AppShell,
  Avatar,
  Group,
  Header,
  Navbar,
  ScrollArea,
  Stack,
  Box,
  Button,
  UnstyledButton,
  Paper,
  Text,
  Transition,
  Space,
  Footer,
} from "@mantine/core";
import {
  Affiliate,
  Archive,
  Backpack,
  Bell,
  Calendar,
  Certificate2,
  ChevronDown,
  Home2,
  LayoutList,
  Star,
} from "tabler-icons-react";
import Link from "next/link";
import { useClickOutside } from "@mantine/hooks";
import Notif from "./notif";
import ProfileMenu from "./profileMenu";
import { useSession } from "next-auth/react";
import { useUser } from "@/utils/user.routes";

interface layoutProps {
  children: JSX.Element;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const { data: session } = useSession();
  const {
    user: currentUser,
    role,
    isLoading,
  } = useUser(session?.user.email as string);
  const [opened, setOpened] = useState(false);
  const [initials, setInitials] = useState<string>();

  const router = useRouter();
  const paths = ["/signin", "/404"];

  const [notifOpened, setNotifOpened] = useState(false);
  const [profileMenuOpened, setProfileMenuOpened] = useState(false);
  const notifRef = useClickOutside(() => setNotifOpened(false));
  const profileMenuRef = useClickOutside(() => setProfileMenuOpened(false));

  useEffect(() => {
    if (session) {
      const getUserInitials = session?.user.name
        .match(/(^\S\S?|\b\S)?/g)
        ?.join("")
        .match(/(^\S|\S$)?/g)
        ?.join("")
        .toUpperCase();
      setInitials(getUserInitials);
    }
  }, [session]);

  if (paths.includes(router.pathname)) {
    return <>{children}</>;
  }

  const navLinksStudent = [
    {
      name: "Home",
      to: "/",
      icon: (
        <Home2
          size={28}
          strokeWidth={1.5}
          color={router.pathname === "/" ? "maroon" : "gray"}
        />
      ),
    },
    {
      name: "Calendar",
      to: "/calendar",
      icon: (
        <Calendar
          size={28}
          strokeWidth={1.5}
          color={router.pathname === "/calendar" ? "maroon" : "gray"}
        />
      ),
    },
    {
      name: "Application",
      to: "/application",
      icon: (
        <Certificate2
          size={28}
          strokeWidth={1.5}
          color={router.pathname === "/application" ? "maroon" : "gray"}
        />
      ),
    },
    {
      name: "Documents",
      to: "/documents",
      icon: (
        <Archive
          size={28}
          strokeWidth={1.5}
          color={router.pathname === "/documents" ? "maroon" : "gray"}
        />
      ),
    },
  ];

  const navLinksFaculty = [
    {
      name: "Home",
      to: "/",
      icon: (
        <Home2
          size={28}
          strokeWidth={1.5}
          color={router.pathname === "/" ? "maroon" : "gray"}
        />
      ),
    },
    {
      name: "Calendar",
      to: "/calendar",
      icon: (
        <Calendar
          size={28}
          strokeWidth={1.5}
          color={router.pathname === "/calendar" ? "maroon" : "gray"}
        />
      ),
    },
    {
      name: "Application",
      to: "/application",
      icon: (
        <Certificate2
          size={28}
          strokeWidth={1.5}
          color={router.pathname === "/application" ? "maroon" : "gray"}
        />
      ),
    },
    {
      name: "Published Document",
      to: "/publish-document",
      icon: (
        <Archive
          size={28}
          strokeWidth={1.5}
          color={router.pathname === "/publish-document" ? "maroon" : "gray"}
        />
      ),
    },
    {
      name: "Add Course",
      to: "/add-course",
      icon: (
        <Affiliate
          size={28}
          strokeWidth={1.5}
          color={router.pathname === "/add-course" ? "maroon" : "gray"}
        />
      ),
    },
  ];

  const navLinks = [
    {
      name: "Home",
      to: "/",
      icon: (
        <Home2
          size={28}
          strokeWidth={1.5}
          color={router.pathname === "/" ? "maroon" : "gray"}
        />
      ),
    },
    {
      name: "Calendar",
      to: "/calendar",
      icon: (
        <Calendar
          size={28}
          strokeWidth={1.5}
          color={router.pathname === "/calendar" ? "maroon" : "gray"}
        />
      ),
    },
    {
      name: "User Management",
      to: "/user-management",
      icon: (
        <LayoutList
          size={28}
          strokeWidth={1.5}
          color={router.pathname === "/user-management" ? "maroon" : "gray"}
        />
      ),
    },
    {
      name: "Published Document",
      to: "/publish-document",
      icon: (
        <Archive
          size={28}
          strokeWidth={1.5}
          color={router.pathname === "/publish-document" ? "maroon" : "gray"}
        />
      ),
    },
    {
      name: "Application",
      to: "/application",
      icon: (
        <Certificate2
          size={28}
          strokeWidth={1.5}
          color={router.pathname === "/application" ? "maroon" : "gray"}
        />
      ),
    },
    {
      name: "Announcement",
      to: "/announcement",
      icon: (
        <Backpack
          size={28}
          strokeWidth={1.5}
          color={router.pathname === "/announcement" ? "maroon" : "gray"}
        />
      ),
    },
    {
      name: "Add Course",
      to: "/add-course",
      icon: (
        <Affiliate
          size={28}
          strokeWidth={1.5}
          color={router.pathname === "/add-course" ? "maroon" : "gray"}
        />
      ),
    },
  ];

  return (
    <AppShell
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 250 }}
          height={"100"}
          // fixed
          style={{ position: "sticky", left: 0, top: 0 }}
        >
          <Image
            src={Logo}
            alt="PUPQC Research Hub Logo"
            height={90}
            width={150}
          />
          <Space h="xl" />
          {isLoading ? null : (
            <Box>
              {role === "STUDENT" &&
                navLinksStudent.map((li) => (
                  <Link key={li.name} href={li.to}>
                    <Group
                      noWrap
                      p="md"
                      position="left"
                      sx={(theme) => ({
                        userSelect: "none",
                        width: 230,
                        color: router.pathname === li.to ? "maroon" : "gray",
                        "&:hover": {
                          borderRadius: theme.radius.md,
                          backgroundColor: theme.colors.gray[0],
                        },
                      })}
                    >
                      {li.icon}
                      <Text size="sm" weight={500}>
                        {li.name}
                      </Text>
                    </Group>
                  </Link>
                ))}
              {role === "FACULTY" &&
                navLinksFaculty.map((li) => (
                  <Link key={li.name} href={li.to}>
                    <Group
                      noWrap
                      p="md"
                      position="left"
                      sx={(theme) => ({
                        userSelect: "none",
                        width: 230,
                        color: router.pathname === li.to ? "maroon" : "gray",
                        "&:hover": {
                          borderRadius: theme.radius.md,
                          backgroundColor: theme.colors.gray[0],
                        },
                      })}
                    >
                      {li.icon}
                      <Text size="sm" weight={500}>
                        {li.name}
                      </Text>
                    </Group>
                  </Link>
                ))}
              {role === "ADMIN" &&
                navLinks.map((li) => (
                  <Link key={li.name} href={li.to}>
                    <Group
                      p="md"
                      position="left"
                      sx={(theme) => ({
                        userSelect: "none",
                        width: 230,
                        color: router.pathname === li.to ? "maroon" : "gray",
                        "&:hover": {
                          borderRadius: theme.radius.md,
                          backgroundColor: theme.colors.gray[0],
                        },
                      })}
                    >
                      {li.icon}
                      <Text size="sm" weight={500}>
                        {li.name}
                      </Text>
                    </Group>
                  </Link>
                ))}
            </Box>
          )}
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
          padding: 0,
          height: "100vh",
        },
      })}
    >
      <ScrollArea style={{ height: "100%" }} type="scroll">
        <Header
          height={80}
          style={{ border: 0, background: "transparent", position: "sticky" }}
        >
          <Stack
            style={{ height: "100%" }}
            align="flex-end"
            justify="center"
            px="xl"
            mx="xl"
          >
            <Group spacing="xs">
              <span ref={notifRef} style={{ position: "relative" }}>
                <UnstyledButton
                  p="xs"
                  onClick={() => setNotifOpened((e) => !e)}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Bell strokeWidth={1.5} />
                </UnstyledButton>
                <Transition
                  mounted={notifOpened}
                  transition="pop-top-right"
                  duration={200}
                  timingFunction="ease"
                >
                  {(styles) => <Notif styles={styles} />}
                </Transition>
              </span>
              <span ref={profileMenuRef} style={{ position: "relative" }}>
                {!session?.user.image ? (
                  <Avatar
                    color="red"
                    radius="xl"
                    onClick={() => setProfileMenuOpened((e) => !e)}
                  >
                    {initials}
                  </Avatar>
                ) : (
                  <Avatar
                    sx={{ cursor: "pointer" }}
                    radius="xl"
                    size={32}
                    src={session?.user.image}
                    alt="profile pic"
                    onClick={() => setProfileMenuOpened((e) => !e)}
                  />
                )}

                <Transition
                  mounted={profileMenuOpened}
                  transition="pop-top-right"
                  duration={200}
                  timingFunction="ease"
                >
                  {(styles) => (
                    <ProfileMenu
                      currentUser={currentUser}
                      styles={styles}
                      // onClick={() => setProfileMenuOpened(false)}
                    />
                  )}
                </Transition>
              </span>
            </Group>
          </Stack>
        </Header>
        {children}
        <Space h="md" />
      </ScrollArea>
      <Footer
        height={50}
        style={{
          border: 0,
          background: "white",
          position: "sticky",
          bottom: 0,
          left: 0,
        }}
      >
        <Stack align="center" justify="center" sx={{ height: "100%" }}>
          <Text color="dimmed" weight={500}>
            2022 Ⓒ Research Hub.
          </Text>
        </Stack>
      </Footer>
    </AppShell>
  );
};

export default Layout;
