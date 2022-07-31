import { Button, Center, Modal, Space } from "@mantine/core";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Download } from "tabler-icons-react";
import Folder from "../folder";

const PDFViewer = dynamic(() => import("./viewer"), {
  ssr: false,
});

type pdfProps = {
  path: string;
  title: string;
};

export default function PDF({ path, title }: pdfProps) {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Modal
        radius="md"
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        size="xl"
      >
        <Button variant="light">
          <Download />
        </Button>
        <Space h="xl" />
        <Center>
          <PDFViewer path={path} />
        </Center>
      </Modal>
      <Folder
        title={title}
        onClick={() => setOpened(true)}
        withBorder
        style={{ flex: 1 }}
      />
    </>
  );
}
