import Document from "@/components/document";
import { Space, Title, Container } from "@mantine/core";
import { protectedRoute } from "HOC/protectedRoute";
import { GetServerSideProps } from "next";
import React from "react";

const Documents = () => {
  return (
    <Container size="xl">
      <Title order={2}>Published Document</Title>
      <Space h="md" />
      <Document />
    </Container>
  );
};

export default Documents;

export const getServerSideProps: GetServerSideProps = protectedRoute(
  async ({ req }) => {
    // @ts-ignore
    return { props: { user: JSON.parse(JSON.stringify(req.user)) } };
  }
);
