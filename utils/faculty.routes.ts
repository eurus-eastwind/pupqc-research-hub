/* eslint-disable react-hooks/rules-of-hooks */
import { User } from "@prisma/client";
import useSWR from "swr";

export const getFaculties = (user: any) => {
  const { data, error } = useSWR("/api/faculty");

  return {
    faculty: data?.faculty.filter((s: any) => s.email !== user.email) as User[],
    isLoading: !error && !data,
    isError: error,
    count: data?.count,
  };
};
