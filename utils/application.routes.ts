/* eslint-disable react-hooks/rules-of-hooks */
import { Application } from "@prisma/client";
import axios from "axios";
import useSWR from "swr";

export const getApplication = (userId: string) => {
  const { data, error } = useSWR(
    () => userId && `/api/application?userId=${userId}`
  );

  return {
    application: data?.application as Application[],
    isLoading: !error && !data,
    isError: error,
    count: data?.count,
  };
};

export const createApplication = async (data: any) =>
  await axios.post(`/api/application`, data);

export const updateApplication = async (id: number, data: any) =>
  await axios.put(`/api/application/${id}`, data);

export const deleteApplication = async (id: number) =>
  axios.delete(`/api/application/${id}`);
