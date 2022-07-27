import { Group, MantineTheme, Text } from "@mantine/core";
import { DropzoneStatus } from "@mantine/dropzone";
import {
  X,
  Upload,
  Icon as TablerIcon,
  FileDescription,
} from "tabler-icons-react";

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <FileDescription {...props} />;
}

export const dropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme
) => (
  <Group position="center" style={{ minHeight: 60, pointerEvents: "none" }}>
    <ImageUploadIcon
      status={status}
      style={{ color: getIconColor(status, theme) }}
      size={40}
    />

    <div>
      <Text size="xl" inline>
        Drag pdf here or click to select files
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Attach as many files as you like, each file should not exceed 5mb
      </Text>
    </div>
  </Group>
);
