import {
  Container,
  Space,
  Paper,
  Title,
  Button,
  Stack,
  Avatar,
  Box,
  Group,
  TextInput,
  Textarea,
  Grid,
  Text,
  Alert,
} from "@mantine/core";
import { protectedRoute } from "HOC/protectedRoute";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { AlertCircle, Plus, Rocket } from "tabler-icons-react";

const Announcement = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  console.log(data);
  return (
    <Container size="xl">
      <Grid grow>
        <Grid.Col span={2}>
          <Paper p="md" radius="md" shadow="sm">
            <form>
              <TextInput
                variant="filled"
                radius="md"
                label="Title"
                placeholder="Title"
              />
              <Textarea
                placeholder="Description"
                label="Description"
                variant="filled"
                radius="md"
                autosize
                minRows={2}
                maxRows={5}
              />
              <Space h="md" />
              <Button
                fullWidth
                color="red"
                variant="light"
                onClick={() =>
                  setData({
                    title: "Announcement 1",
                    description: "Announcement content",
                  })
                }
              >
                Create
              </Button>
            </form>
          </Paper>
        </Grid.Col>
        <Grid.Col span={4}>
          <Paper
            p="md"
            radius="md"
            shadow="sm"
            sx={{ flex: 4, height: "80vh" }}
          >
            {!data.title && !data.description && (
              <Stack
                align="center"
                justify="center"
                spacing="xl"
                sx={{ height: "100%" }}
              >
                <Avatar size={160} radius={80} color="red">
                  <Rocket size={80} />
                </Avatar>
                <Text color="dimmed" weight={500} size="lg">
                  No Announcement!
                </Text>
              </Stack>
            )}
            {data.title && data.description && (
              <>
                <Alert
                  icon={<AlertCircle size={16} />}
                  title="2021 Annual List of Reviewers"
                  color="green"
                  variant="light"
                  sx={{ textAlign: "justify" }}
                >
                  <Text size="sm">
                    Peer reviewers are critical to the publishing process. They
                    act as a filter to ensure research is properly vetted and
                    appropriate for our readers, and they provide constructive
                    feedback to improves the quality of scholarship found in the
                    Journal of Youth Development.
                  </Text>
                  <Space h="sm" />
                  <Text size="sm" weight={500}>
                    Posted: 2022-01-05
                  </Text>
                </Alert>
              </>
            )}
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Announcement;

export const getServerSideProps: GetServerSideProps = protectedRoute(
  async ({ req }) => {
    // @ts-ignore
    return { props: { user: JSON.parse(JSON.stringify(req.user)) } };
  }
);
