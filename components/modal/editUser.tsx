import { updateUser } from "@/utils/user.routes";
import { Button, Modal, Select, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { mutate } from "swr";
import SelectComponent from "../selectComponent";

interface editUserProps {
  user: User;
}

const EditUserModal: React.FC<editUserProps> = ({ user }) => {
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      course: "",
      position: "",
      email: "",
      status: "",
    },
  });

  useEffect(() => {
    form.setValues({
      name: user.name || "",
      course: user.course || "",
      position: user.position || "",
      email: user.email || "",
      status: user.status || "",
    });
  }, [user]);

  const onSubmit = async (values: typeof form.values) => {
    await updateUser(values.email, values);
    mutate("/api/student");
    mutate("/api/faculty");
    form.reset();
    setOpened(false);
  };

  return (
    <>
      <Modal
        size="lg"
        radius="md"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Research"
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
            disabled
            {...form.getInputProps("email")}
          />
          {user.role === "STUDENT" ? (
            <SelectComponent {...form.getInputProps("course")} />
          ) : (
            <TextInput
              radius="md"
              label="Position"
              placeholder="Position"
              {...form.getInputProps("position")}
            />
          )}

          <Select
            label="Status"
            placeholder="Pick one"
            data={["ACTIVE", "INACTIVE"]}
            {...form.getInputProps("status")}
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
      <Button
        radius="md"
        variant="light"
        color="blue"
        onClick={() => setOpened(true)}
      >
        Edit
      </Button>
    </>
  );
};

export default EditUserModal;
