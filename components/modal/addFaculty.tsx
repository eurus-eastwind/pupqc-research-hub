import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { Plus } from "tabler-icons-react";
import {
  Group,
  useMantineTheme,
  Button,
  TextInput,
  Modal,
  Space,
} from "@mantine/core";
import axios from "axios";
import { mutate } from "swr";

const AddFacultyModal: React.FC = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const form = useForm({
    // schema: zodResolver(schema),
    initialValues: {
      name: "",
      position: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    const data = { ...values, role: "FACULTY" };
    await axios.post(`/api/auth/register`, data);
    mutate(`/api/faculty`);
    form.reset();
    setOpened(false);
  };

  return (
    <>
      <Modal
        size="lg"
        radius="md"
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Faculty"
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            required
            radius="md"
            label="Name"
            placeholder="Name"
            {...form.getInputProps("name")}
          />

          <TextInput
            required
            radius="md"
            label="Position"
            placeholder="Position"
            {...form.getInputProps("position")}
          />

          <TextInput
            required
            radius="md"
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <TextInput
            type="password"
            required
            radius="md"
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <Space h="md" />
          <Button
            type="submit"
            fullWidth
            radius="md"
            color="red"
            variant="light"
          >
            Add
          </Button>
        </form>
      </Modal>

      <Group position="center">
        <Button
          variant="light"
          color="red"
          radius="md"
          leftIcon={<Plus size={14} />}
          onClick={() => setOpened(true)}
        >
          Create
        </Button>
      </Group>
    </>
  );
};

export default AddFacultyModal;
