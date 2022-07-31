import ViewFeedBackModal from "@/components/modal/viewFeedBack";
import { useUser } from "@/utils/user.routes";
import {
  Container,
  Title,
  Stack,
  Paper,
  TextInput,
  Button,
  Textarea,
  Center,
  Text,
  Table,
  Group,
  Space,
} from "@mantine/core";
import { User } from "@prisma/client";
import { protectedRoute } from "HOC/protectedRoute";
import { GetServerSideProps } from "next";
import React from "react";
import { Search } from "tabler-icons-react";

interface contactUsProps {
  user: User;
}

const ContactUsPage: React.FC<contactUsProps> = ({ user }) => {
  const { role } = useUser(user.email as string);

  const studentRow = (
    <tr>
      <td>Judell Mejorada</td>
      <td>mejoradajudell15@gmail.com</td>
      <td>BSBA-MM</td>
      <td>7/10/2022</td>
      <td>
        <ViewFeedBackModal />
      </td>
    </tr>
  );

  return (
    <Container size="xl">
      {role !== "STUDENT" ? (
        <>
          <Group position="right">
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
                  <th>Email</th>
                  <th>Course</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{studentRow}</tbody>
            </Table>
          </Paper>
        </>
      ) : (
        <Stack align="center" justify="center">
          <Paper shadow="sm" radius="md" p="md" sx={{ width: "60%" }}>
            <Stack>
              <Center>
                <Title order={2}>Send us some feedback!</Title>
              </Center>
              <Center>
                <Text color="dimmed">
                  Do you have a suggestions or found a bug? Let us know in the
                  field below.
                </Text>
              </Center>
              <Textarea
                label=""
                placeholder="Describe your issue or idea..."
                radius="md"
                autosize
                minRows={4}
                maxRows={8}
              />
              <Button variant="light" color="red">
                Submit
              </Button>
            </Stack>
          </Paper>
        </Stack>
      )}
    </Container>
  );
};

export default ContactUsPage;

export const getServerSideProps: GetServerSideProps = protectedRoute(
  async ({ req }) => {
    // @ts-ignore
    return { props: { user: JSON.parse(JSON.stringify(req.user)) } };
  }
);
