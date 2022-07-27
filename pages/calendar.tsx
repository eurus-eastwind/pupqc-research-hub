import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Button,
  Container,
  Group,
  Paper,
  Title,
  Stack,
  Space,
  Box,
  useMantineTheme,
  Modal,
} from "@mantine/core";
import { Calendar, getWeekdaysNames } from "@mantine/dates";
import { DaySchedule, ScheduleView } from "react-schedule-view";
import dayjs from "dayjs";
import { Plus } from "tabler-icons-react";
import { GetServerSideProps } from "next";
import { protectedRoute } from "HOC/protectedRoute";
import AddCalendarModal from "@/components/modal/addCalendar";

interface calendarPageProps {
  date: string;
}

const CalendarPage: React.FC<calendarPageProps> = () => {
  const theme = useMantineTheme();

  const [value, setValue] = useState<Date | null>(null);

  // console.log(getWeekdaysNames("en", "sunday", "dddd"));
  const data: DaySchedule[] = getWeekdaysNames("en", "sunday", "dddd").map(
    (day, i) => ({ name: day, events: [] })
  );

  data[1] = {
    name: "Monday",
    events: [
      {
        color: "orange",
        startTime: 8,
        endTime: 18,
        title: "Check-in",
        description:
          "Follow the signs to the registration desk inside the north entrance",
      },
    ],
  };
  data[6] = {
    name: "Saturday",
    events: [
      {
        color: "green",
        startTime: 15,
        endTime: 19,
        title: "Next Day's Event",
      },
    ],
  };

  return (
    <>
      <Container size="xl">
        <Title order={2}>Calendar</Title>
        <Space h="md" />
        <Group
          style={{
            alignItems: "flex-start",
          }}
        >
          <Paper
            shadow="sm"
            p="md"
            radius="md"
            style={{ width: "max-content" }}
          >
            <Calendar
              firstDayOfWeek="sunday"
              value={value}
              onChange={setValue}
              dayStyle={(date) =>
                date.getDate() === dayjs().date()
                  ? {
                      backgroundColor: theme.colors.maroon[0],
                      color: theme.white,
                    }
                  : {}
              }
            />
          </Paper>

          <Paper sx={{ flex: 1 }} shadow="sm" p="md" radius="md">
            <Group position="apart" px="md">
              <Title>
                {value
                  ? dayjs(value).format("MMMM D, YYYY")
                  : dayjs().format("MMMM D, YYYY")}
              </Title>
              <AddCalendarModal />
            </Group>
            <Space h="xl" />
            <ScheduleView
              theme="apple"
              daySchedules={data}
              viewStartTime={7}
              viewEndTime={20}
            />
          </Paper>
        </Group>
      </Container>
    </>
  );
};

export default CalendarPage;

export const getServerSideProps: GetServerSideProps = protectedRoute(
  async (ctx) => {
    return { props: {} };
  }
);
