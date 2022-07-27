import { Avatar, Paper, Space, Title, Text, Group } from "@mantine/core";
import React from "react";
import { Star } from "tabler-icons-react";
import { CustomColors } from "types/mantine";

interface statsCardProps {
  icon: JSX.Element;
  total: number;
  text: string;
  color: CustomColors;
}

const StatsCard: React.FC<statsCardProps> = ({ icon, total, text, color }) => {
  return (
    <Paper shadow="sm" radius="md" p="md" style={{ width: "15rem", flex: 1 }}>
      <Group noWrap>
        <Avatar color={color} radius="xl">
          {icon}
        </Avatar>
        <Space h="md" />
        <Group noWrap>
          <Title order={4}>{total}</Title>
          <Text>{text}</Text>
        </Group>
      </Group>
    </Paper>
  );
};

export default StatsCard;
