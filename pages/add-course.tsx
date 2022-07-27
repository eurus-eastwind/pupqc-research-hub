import {
  Button,
  Center,
  Container,
  Group,
  Paper,
  Space,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import React from "react";
import { Plus } from "tabler-icons-react";

const AddCourse = () => {
  return (
    <Container size="xl">
      <Stack align="center" justify="center">
        <Paper p="xl" radius="md" shadow="sm" sx={{ width: "30rem" }}>
          <Center>
            <Title order={2}>Add Course</Title>
          </Center>
          <form>
            <TextInput
              required
              radius="md"
              label="Course"
              placeholder="Course"
            />
            <TextInput
              required
              radius="md"
              label="Description"
              placeholder="Description"
            />
            <Space h="md" />

            <Button
              fullWidth
              variant="light"
              color="red"
              radius="md"
              leftIcon={<Plus size={14} />}
              // onClick={() => setOpened(true)}
            >
              Create
            </Button>
          </form>
        </Paper>
      </Stack>
    </Container>
  );
};

export default AddCourse;
