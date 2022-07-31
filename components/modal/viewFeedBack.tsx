import { Button, Group, Modal, Space, Text, Title } from "@mantine/core";
import React, { useState } from "react";

const ViewFeedBackModal = () => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Modal
        radius="md"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Feedback"
      >
        <Title order={4}>Judell Mejorada</Title>
        <Space h="xl" />
        <Text align="justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Space h="xl" />
        <Button
          fullWidth
          variant="light"
          color="red"
          onClick={() => setOpened(false)}
        >
          Close
        </Button>
      </Modal>
      <Group position="center">
        <Button
          variant="light"
          color="red"
          radius="md"
          onClick={() => setOpened(true)}
        >
          View
        </Button>
      </Group>
    </>
  );
};

export default ViewFeedBackModal;
