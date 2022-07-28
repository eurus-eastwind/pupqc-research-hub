import { useForm, zodResolver } from "@mantine/form";
import React, { useEffect, useState } from "react";
import { FileDescription, Plus, Select } from "tabler-icons-react";
import {
  Group,
  Text,
  useMantineTheme,
  Button,
  TextInput,
  Space,
  Paper,
  ActionIcon,
  Avatar,
  Modal,
} from "@mantine/core";
import { X } from "tabler-icons-react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { createDocument } from "@/utils/documents.routes";
import { mutate } from "swr";
import { dropzoneChildren } from "../dropZoneChildren";
import SelectComponent from "@/components/selectComponent";
import { z } from "zod";
import RichText from "@/components/richText";

const schema = z.object({
  title: z.string().min(1, { message: "Title must not be empty" }),
  researchers: z.string().min(1, { message: "Please input the researchers" }),
  course: z.string().min(1, { message: "Please select your course" }),
});

interface addDocumentProps {
  role: string;
}

const AddDocumentModal: React.FC<addDocumentProps> = ({ role }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const [file, setFile] = useState([]);
  const [acceptedFile, setAcceptedFile] = useState<any[]>([]);
  const [abstract, onChange] = useState("");

  useEffect(() => {
    setAcceptedFile((f: any) => [...f, ...file]);
  }, [file]);

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      title: "",
      researchers: "",
      course: "",
    },
  });

  const onSubmit = async (values: {
    title: string;
    researchers: string;
    course: string;
  }) => {
    const researchersObject = values.researchers.split(",");
    const data = {
      ...values,
      researchers: researchersObject,
      abstract,
      role,
    };

    await createDocument(data);
    form.reset();
    setOpened(false);
    mutate(`/api/documents?role=${role}`);
  };

  return (
    <>
      <Modal
        size="lg"
        radius="md"
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Research"
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            required
            radius="md"
            label="Title"
            placeholder="Research Title"
            {...form.getInputProps("title")}
          />
          <SelectComponent {...form.getInputProps("course")} />
          <TextInput
            required
            radius="md"
            label="Reseachers Name"
            placeholder="Haywood Robinson, Sage Ferguson"
            description="Names must be separated with comma"
            {...form.getInputProps("researchers")}
          />
          <Space h="md" />
          <RichText value={abstract} onChange={onChange} />
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

export default AddDocumentModal;
