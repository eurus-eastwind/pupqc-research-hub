/* eslint-disable react-hooks/rules-of-hooks */
import { User } from "@prisma/client";
import useSWR from "swr";

export const getStudents = (user: any) => {
  const { data, error } = useSWR("/api/student");

  return {
    student: data?.student.filter((s: any) => s.email !== user.email) as User[],
    isLoading: !error && !data,
    isError: error,
    count: data?.count,
  };
};
