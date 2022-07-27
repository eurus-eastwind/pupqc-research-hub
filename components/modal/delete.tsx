import { ActionIcon, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import React from "react";
import { Trash } from "tabler-icons-react";

interface deleteModalProps {
  onClick: () => void;
  title: string;
}

const DeleteModal: React.FC<deleteModalProps> = ({ onClick, title }) => {
  const modals = useModals();

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title,
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this? This action is destructive and
          you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: onClick,
    });

  return (
    <ActionIcon
      size="lg"
      color="red"
      radius="md"
      variant="hover"
      onClick={openDeleteModal}
    >
      <Trash size={18} />
    </ActionIcon>
  );
};

export default DeleteModal;
