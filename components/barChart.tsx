import React from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Paper, useMantineTheme } from "@mantine/core";
import { courses } from "data/course";

const BarChart = () => {
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

  const labels = courses.map((c) => c.name);

  const colors = [
    theme.colors.green[4],
    theme.colors.grape[4],
    theme.colors.blue[4],
    theme.colors.teal[4],
    theme.colors.yellow[4],
    theme.colors.cyan[4],
    theme.colors.red[4],
    theme.colors.orange[4],
    theme.colors.lime[4],
    theme.colors.pink[4],
  ];

  const datasets = labels.map((label, i) => ({
    label,
    data: 1,
    backgroundColor: theme.fn.rgba(colors[i], 0.5),
    borderColor: colors[i],
    borderWidth: 1.5,
  }));

  const data = {
    labels,
    datasets,
  };
  return (
    <Paper
      shadow="sm"
      p="md"
      radius="md"
      style={{ height: "25rem", width: "49%" }}
    >
      <Bar options={options} data={data} />
    </Paper>
  );
};

export default BarChart;
