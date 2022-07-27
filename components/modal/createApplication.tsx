import { createApplication } from "@/utils/application.routes";
import { updateUser, useUser } from "@/utils/user.routes";
import {
  ActionIcon,
  Avatar,
  Button,
  Group,
  Modal,
  Paper,
  Select,
  Space,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { mutate } from "swr";
import { FileDescription, Plus, X } from "tabler-icons-react";
import { dropzoneChildren } from "../dropZoneChildren";
import SelectComponent from "../selectComponent";

const CreateApplicationModal: React.FC = () => {
  const { data } = useSession();
  const { user } = useUser(data?.user.email as string);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [file, setFile] = useState([]);
  const [acceptedFile, setAcceptedFile] = useState<any[]>([]);

  useEffect(() => {
    setAcceptedFile((f: any) => [...f, ...file]);
  }, [file]);

  const form = useForm({
    initialValues: {
      title: "",
      course: "",
      authors: "",
      applicantType: "",
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    const authorsObject = values.authors.split(",");
    const data = {
      ...values,
      authors: authorsObject,
      applicantType: user.role,
      userId: user.id,
    };
    const application = await createApplication(data);
    if (application.status === 201) {
      mutate(`/api/application?userId=${user.id}`);
    }
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
        title="Apply for research ethics certificate"
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            required
            radius="md"
            label="Title"
            placeholder="Title"
            {...form.getInputProps("title")}
          />
          <TextInput
            required
            radius="md"
            label="Authors"
            description="Names must be separated with comma"
            placeholder="Authors"
            {...form.getInputProps("authors")}
          />

          <SelectComponent {...form.getInputProps("course")} />
          <Space h="md" />
          <Dropzone
            radius="md"
            onDrop={(files: any) => setFile(files)}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={3 * 1024 ** 2}
            accept={[MIME_TYPES.pdf]}
          >
            {(status) => dropzoneChildren(status, theme)}
          </Dropzone>
          <Space h="md" />
          {acceptedFile.map((f, i) => (
            <Paper mb="md" key={i} p="xl" radius="md" withBorder>
              <Group position="apart">
                <Group>
                  <Avatar radius="xl">
                    <FileDescription />
                  </Avatar>
                  <Text size="sm">{f.name}</Text>
                </Group>
                <ActionIcon
                  variant="light"
                  size="sm"
                  onClick={() =>
                    setAcceptedFile([
                      ...acceptedFile.slice(0, i),
                      ...acceptedFile.slice(i + 1, acceptedFile.length),
                    ])
                  }
                >
                  <X />
                </ActionIcon>
              </Group>
            </Paper>
          ))}
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
        variant="light"
        color="red"
        radius="md"
        leftIcon={<Plus size={14} />}
        onClick={() => setOpened(true)}
      >
        Apply
      </Button>
    </>
  );
};

export default CreateApplicationModal;
