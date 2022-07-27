import { User } from "@prisma/client";
import axios from "axios";
import useSWR, { mutate } from "swr";

export const useUser = (email: string) => {
  const { data, error } = useSWR(() => email && `/api/user/${email}`);

  return {
    user: data?.user as User,
    role: data?.user?.role,
    isLoading: !error && !data,
    isError: error,
  };
};

export const updateUser = async (email: string, data: any) =>
  await axios.put(`/api/user/${email}`, data);

export const deleteUser = async (email: string) => {
  await axios.delete(`/api/user/${email}`);
  mutate(`/api/student`);
  mutate(`/api/faculty`);
};
