import CreateApplicationModal from "@/components/modal/createApplication";
import DeleteModal from "@/components/modal/delete";
import EditApplicationModal from "@/components/modal/editApplication";
import { deleteApplication, getApplication } from "@/utils/application.routes";
import { useUser } from "@/utils/user.routes";
import {
  Title,
  Container,
  Space,
  Paper,
  Center,
  Stack,
  TextInput,
  RadioGroup,
  Radio,
  Button,
  Box,
  Tabs,
  Group,
  Avatar,
  Table,
  Badge,
} from "@mantine/core";
import { Application, User } from "@prisma/client";
import { protectedRoute } from "HOC/protectedRoute";
import { GetServerSideProps } from "next";
import React from "react";
import useSWR, { mutate } from "swr";
import { Plus, Search, Table as TableIcon, Trash } from "tabler-icons-react";

interface applicationProps {
  user: User;
}

const Appilication: React.FC<applicationProps> = ({ user }) => {
  const { user: data } = useUser(user.email as string);
  const { application, count } = getApplication(data?.id);
  const { data: applicationAdmin } = useSWR<{
    application: Application[];
  }>(`/api/application`);
  const studentRow = application?.map((a, i) => (
    <tr key={a.id}>
      <td>{a.title}</td>
      <td>{a.authors.map((e) => (a.authors.at(-1) === e ? e : e + ", "))}</td>
      <td>
        <Badge
          color={
            a.status === "PENDING"
              ? "yellow"
              : a.status === "APPROVED"
              ? "green"
              : "red"
          }
        >
          {a.status}
        </Badge>
      </td>
      <td>
        <Group spacing="sm">
          <EditApplicationModal
            application={application[i]}
            userId={data?.id}
          />
          <DeleteModal
            title="Delete Application"
            onClick={async () => {
              await deleteApplication(application[i].id);
              mutate(`/api/application?userId=${data?.id}`);
            }}
          />
        </Group>
      </td>
    </tr>
  ));

  console.log(applicationAdmin?.application);
  const adminRow = applicationAdmin?.application.map((a, i) => (
    <tr key={a.id}>
      <td>{a.title}</td>
      <td>
        {a.authors.map((e: any) => (a.authors.at(-1) === e ? e : e + ", "))}
      </td>
      <td>
        <Badge
          color={
            a.status === "PENDING"
              ? "yellow"
              : a.status === "APPROVED"
              ? "green"
              : "red"
          }
        >
          {a.status}
        </Badge>
      </td>
      <td>
        <Group spacing="sm">
          <EditApplicationModal
            application={applicationAdmin?.application[i]}
            userId={data?.id}
          />
          <DeleteModal
            title="Delete Application"
            onClick={async () => {
              await deleteApplication(applicationAdmin?.application[i]?.id);
              mutate(`/api/application`);
            }}
          />
        </Group>
      </td>
    </tr>
  ));

  return (
    <Container size="xl">
      <Title>Certificate Application</Title>
      <Space h="md" />

      <Group>
        <Title sx={{ flex: 1 }} order={3}>
          List of Application
        </Title>
        <TextInput
          radius="md"
          placeholder="Search"
          rightSection={<Search size={14} />}
        />
        <CreateApplicationModal />
      </Group>
      <Space h="md" />
      <Paper shadow="sm" p="md" radius="md">
        <Table horizontalSpacing="xl" verticalSpacing="sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author(s)</th>
              <th>Status</th>
              <th style={{ width: "10rem" }}></th>
            </tr>
          </thead>
          <tbody>{user.role === "STUDENT" ? studentRow : adminRow}</tbody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Appilication;

export const getServerSideProps: GetServerSideProps = protectedRoute(
  async ({ req }) => {
    // @ts-ignore
    return { props: { user: JSON.parse(JSON.stringify(req.user)) } };
  }
);
