import { Container, Space, Tabs, Title } from "@mantine/core";
import React from "react";
import { Book2 } from "tabler-icons-react";

import { GetServerSideProps } from "next";
import { protectedRoute } from "HOC/protectedRoute";

import Document from "@/components/document";

const PublishDocumentPage: React.FC = () => {
  return (
    <Container size="xl">
      <Title order={2}>Published Document</Title>
      <Space h="md" />
      <Tabs tabPadding="md" color="red">
        <Tabs.Tab label="Student" icon={<Book2 size={14} />}>
          <Document title="Student Research Document" role="STUDENT" />
        </Tabs.Tab>
        <Tabs.Tab label="Faculty" icon={<Book2 size={14} />}>
          <Document title="Faculty Research Document" role="STAFF" />
        </Tabs.Tab>
      </Tabs>
    </Container>
  );
};

export default PublishDocumentPage;

export const getServerSideProps: GetServerSideProps = protectedRoute(
  async (ctx) => {
    return { props: {} };
  }
);
