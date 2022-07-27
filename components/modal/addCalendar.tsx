import {
  Button,
  Group,
  Modal,
  Space,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { Plus } from "tabler-icons-react";

const AddCalendarModal = () => {
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      eventName: "",
      description: "",
      date: "",
      time: new Date(),
    },
  });

  const onSubmit = (values: typeof form.values) => {
    console.log(values);
  };

  return (
    <>
      <Modal
        radius="md"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add schedule"
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Event Name"
            placeholder="Event name"
            radius="md"
            required
            {...form.getInputProps("eventName")}
          />
          <Textarea
            radius="md"
            label="Description"
            placeholder="Description here"
            required
            {...form.getInputProps("description")}
          />
          <DatePicker
            radius="md"
            placeholder="Pick date"
            label="Event date"
            required
            {...form.getInputProps("date")}
          />
          <TimeInput
            defaultValue={new Date()}
            label="Pick time"
            radius="md"
            format="12"
            amLabel="am"
            pmLabel="pm"
            required
            clearable
            {...form.getInputProps("time")}
          />
          <Space h="md" />
          <Button fullWidth type="submit" variant="light" color="red">
            Submit
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

export default AddCalendarModal;
