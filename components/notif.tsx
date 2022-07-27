import {
  Avatar,
  Group,
  Paper,
  Space,
  Text,
  Title,
  Stack,
  Alert,
} from "@mantine/core";
import React from "react";
import { AlertCircle, Send } from "tabler-icons-react";

interface notifProps {
  styles: any;
}

const Notif: React.FC<notifProps> = ({ styles }) => {
  return (
    <Paper
      p="md"
      radius="md"
      withBorder
      style={{
        ...styles,
        position: "absolute",
        top: 45,
        right: 10,
        width: "25rem",
      }}
    >
      <Title order={6}>Notifications</Title>
      <Space h="md" />
      <Alert
        icon={<Send size={16} />}
        title="Research Ethics Certificate"
        color="gray"
        withCloseButton
        closeButtonLabel="Close alert"
        styles={{ title: { color: "black" } }}
      >
        Click here to download your Research Ethics Certificate.
      </Alert>
      <Space h="xs" />
      <Alert
        icon={<Send size={16} />}
        title="Research Ethics Application"
        color="gray"
        withCloseButton
        closeButtonLabel="Close alert"
        styles={{ title: { color: "black" } }}
      >
        Please open your line and check the status of your application.
        REMINDER: Incomplete requirements will not be processed.
      </Alert>
    </Paper>
  );
};

export default Notif;
