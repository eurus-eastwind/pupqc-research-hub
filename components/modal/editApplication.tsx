import { updateApplication } from "@/utils/application.routes";
import { updateUser } from "@/utils/user.routes";
import {
  ActionIcon,
  Button,
  Modal,
  Select,
  Space,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Application, User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { mutate } from "swr";
import { Edit } from "tabler-icons-react";
import SelectComponent from "../selectComponent";

interface editApplicationProps {
  application: Application;
  userId: string;
}

const EditApplicationModal: React.FC<editApplicationProps> = ({
  application,
  userId,
}) => {
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      title: "",
      authors: "",
      status: "",
    },
  });

  useEffect(() => {
    form.setValues({
      title: application?.title || "",
      authors: application.authors.toString() || "",
      status: application?.status || "",
    });
  }, [application]);

  const onSubmit = async (values: typeof form.values) => {
    await updateApplication(application.id as number, values);
    mutate(`/api/application?userId=${userId}`);
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
        title="Edit Application"
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            radius="md"
            label="Title"
            placeholder="Title"
            {...form.getInputProps("title")}
          />
          <TextInput
            radius="md"
            label="Authors"
            placeholder="Authors"
            {...form.getInputProps("authors")}
          />
          <Select
            label="Status"
            data={["PENDING", "APPROVED", "DECLINED"]}
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
      <ActionIcon color="blue" onClick={() => setOpened(true)}>
        <Edit size={18} />
      </ActionIcon>
    </>
  );
};

export default EditApplicationModal;
