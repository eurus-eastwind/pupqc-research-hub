import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Loader,
  Menu,
  Paper,
  Space,
  Table,
  Tabs,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useEffect } from "react";
import { Plus, Search, Table as TableIcon, Trash } from "tabler-icons-react";
import { randomId } from "@mantine/hooks";
import { GetServerSideProps } from "next";
import { protectedRoute } from "HOC/protectedRoute";
import { getStudents } from "@/utils/student.routes";
import { getFaculties } from "@/utils/faculty.routes";
import EditUserModal from "@/components/modal/editUser";
import DeleteModal from "@/components/modal/delete";
import { deleteUser } from "@/utils/user.routes";
import { mutate } from "swr";
import AddFacultyModal from "@/components/modal/addFaculty";
interface userManagementProps {
  user: { name: string; email: string; image: string };
}

const UserManagementPage: React.FC<userManagementProps> = ({ user }) => {
  const { student, isLoading } = getStudents(user);
  const { faculty } = getFaculties(user);

  if (isLoading) return <></>;

  const studentRow = student?.map((e, i) => (
    <tr key={e.id}>
      <td>
        <Group>
          {!e.image ? (
            <Avatar color="red" radius="xl" />
          ) : (
            <Avatar radius="xl" src={e.image} alt="Profile pic" size={34} />
          )}
          {e.name}
        </Group>
      </td>
      <td>{e.course}</td>
      <td>{e.email}</td>
      <td>
        <Badge color={e.status === "ACTIVE" ? "green" : "red"}>
          {e.status}
        </Badge>
      </td>
      <td>
        <Group spacing="sm">
          <EditUserModal user={student[i]} />
          <DeleteModal
            title="Delete User"
            onClick={() => deleteUser(student[i].email as string)}
          />
        </Group>
      </td>
    </tr>
  ));

  const facultyRow = faculty?.map((e, i) => (
    <tr key={e.id}>
      <td>
        <Group>
          {!e.image ? (
            <Avatar color="red" radius="xl" />
          ) : (
            <Avatar radius="xl" src={e.image} alt="Profile pic" size={34} />
          )}
          {e.name}
        </Group>
      </td>
      <td>{e.position}</td>
      <td>{e.email}</td>
      <td>
        <Badge color={e.status === "ACTIVE" ? "green" : "red"}>
          {e.status}
        </Badge>
      </td>
      <td>
        <Group spacing="sm">
          <EditUserModal user={faculty[i]} />
          <DeleteModal
            title="Delete User"
            onClick={() => deleteUser(faculty[i].email as string)}
          />
        </Group>
      </td>
    </tr>
  ));

  return (
    <Container size="xl">
      <Title order={2}>User Management</Title>
      <Space h="md" />
      <Tabs tabPadding="md" color="red">
        <Tabs.Tab label="Student" icon={<TableIcon size={14} />}>
          <Group>
            <Title sx={{ flex: 1 }} order={3}>
              List of Students
            </Title>
            <TextInput
              type="search"
              radius="md"
              placeholder="Search"
              rightSection={<Search size={14} />}
            />
          </Group>
          <Space h="md" />
          <Paper shadow="sm" p="md" radius="md">
            <Table horizontalSpacing="xl" verticalSpacing="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th style={{ width: "10rem" }}></th>
                </tr>
              </thead>
              <tbody>{studentRow}</tbody>
            </Table>
          </Paper>
        </Tabs.Tab>
        <Tabs.Tab label="Faculty" icon={<TableIcon size={14} />}>
          <Group>
            <Title sx={{ flex: 1 }} order={3}>
              List of Faculty Member
            </Title>
            <TextInput
              radius="md"
              placeholder="Search"
              rightSection={<Search size={14} />}
            />
            <AddFacultyModal />
          </Group>
          <Space h="md" />
          <Paper shadow="sm" p="md" radius="md">
            <Table horizontalSpacing="xl" verticalSpacing="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position Title</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th style={{ width: "10rem" }}></th>
                </tr>
              </thead>
              <tbody>{facultyRow}</tbody>
            </Table>
          </Paper>
        </Tabs.Tab>
      </Tabs>
    </Container>
  );
};

export default UserManagementPage;

export const getServerSideProps: GetServerSideProps = protectedRoute(
  async ({ req }) => {
    // @ts-ignore
    return { props: { user: req.user } };
  }
);
