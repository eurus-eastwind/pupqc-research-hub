import React from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Paper, useMantineTheme } from "@mantine/core";

const AreaChart = () => {
  const theme = useMantineTheme();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Number of document per month",
      },
    },
  };

  const labels = Array.from({ length: 12 }, (item, i) => {
    return new Date(0, i).toLocaleString("en-US", { month: "short" });
  });

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Master",
        data: 1,
        borderColor: theme.colors.red[4],
        borderWidth: 1.5,
        backgroundColor: theme.fn.rgba(theme.colors.red[4], 0.5),
      },
      {
        fill: true,
        label: "Bachelor",
        data: 1,
        borderColor: theme.colors.violet[4],
        borderWidth: 1.5,
        backgroundColor: theme.fn.rgba(theme.colors.violet[4], 0.5),
      },
      {
        fill: true,
        label: "Diploma",
        data: 1,
        borderColor: theme.colors.pink[4],
        borderWidth: 1.5,
        backgroundColor: theme.fn.rgba(theme.colors.pink[4], 0.5),
      },
    ],
  };
  return (
    <Paper
      shadow="sm"
      p="md"
      radius="md"
      style={{ height: "25rem", width: "49%" }}
    >
      <Line options={options} data={data} />
    </Paper>
  );
};

export default AreaChart;
