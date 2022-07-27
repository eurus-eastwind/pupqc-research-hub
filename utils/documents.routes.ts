/* eslint-disable react-hooks/rules-of-hooks */
import { Documents } from "@prisma/client";
import axios from "axios";
import useSWR from "swr";

export const getDocuments = (role?: string) => {
  const { data, error } = useSWR(() =>
    role ? `/api/documents?role=${role}` : `/api/documents`
  );

  return {
    document: data?.document as Documents[],
    isLoading: !error && !data,
    isError: error,
    count: data?.count,
  };
};

export const createDocument = async (data: any) =>
  await axios.post("/api/documents", data);
