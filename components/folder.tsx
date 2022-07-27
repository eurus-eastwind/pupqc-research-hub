import { Avatar, Group, Paper, Text } from "@mantine/core";
import React from "react";
import { Folder as FolderIcon } from "tabler-icons-react";

interface folderProps {
  title: string;
  onClick: React.MouseEventHandler;
  withBorder?: boolean;
  style?: React.CSSProperties;
}

const Folder: React.FC<folderProps> = ({
  title,
  onClick,
  withBorder,
  style,
}) => {
  return (
    <Paper
      onClick={onClick}
      shadow="sm"
      radius="md"
      p="md"
      style={{
        minWidth: "18rem",
        cursor: "pointer",
        ...style,
      }}
      withBorder={withBorder}
    >
      <Group noWrap>
        <Avatar radius="xl">
          <FolderIcon />
        </Avatar>
        <Text lineClamp={1}>{title}</Text>
      </Group>
    </Paper>
  );
};

export default Folder;
