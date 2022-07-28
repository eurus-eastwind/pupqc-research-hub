import EditApplicationModal from "@/components/modal/editApplication";
import {
  ActionIcon,
  Button,
  Center,
  Container,
  Group,
  Paper,
  ScrollArea,
  Space,
  Stack,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { courses } from "data/course";
import React from "react";
import { Plus, Trash } from "tabler-icons-react";

const elements = courses.map((c) => ({ name: `${c.name}-${c.value}` }));

const AddCourse = () => {
  const rows = elements.map((e) => (
    <tr key={e.name}>
      <td>{e.name}</td>
      <td>
        <Group noWrap spacing="sm">
          <Button color="red" variant="light">
            Edit
          </Button>
          <ActionIcon color="red">
            <Trash />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));
  return (
    <Container size="xl">
      <Group noWrap align="flex-start">
        <Paper p="xl" radius="md" shadow="sm" sx={{ width: "25rem" }}>
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
        <Paper p="md" radius="md" shadow="sm">
          {/* <ScrollArea sx={{ height: "70vh" }}> */}
          <Table horizontalSpacing="xl" verticalSpacing="sm" fontSize="md">
            <thead>
              <tr>
                <th>Course name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
          {/* </ScrollArea> */}
        </Paper>
      </Group>
    </Container>
  );
};

export default AddCourse;
