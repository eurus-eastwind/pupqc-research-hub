import React, { useState } from "react";

import {
  Alert,
  Container,
  Grid,
  Group,
  Paper,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import StatsCard from "@/components/statsCard";
import BarChart from "@/components/barChart";
import AreaChart from "@/components/areaChart";
import {
  AlertCircle,
  Article,
  CircleCheck,
  School,
  User,
} from "tabler-icons-react";
import { GetServerSideProps } from "next";
import { protectedRoute } from "HOC/protectedRoute";
import { getStudents } from "@/utils/student.routes";
import { getDocuments } from "@/utils/documents.routes";
import { User as PrismaUser } from "@prisma/client";
import { useUser } from "@/utils/user.routes";
import Folder from "@/components/folder";
import { getFaculties } from "@/utils/faculty.routes";
import PDFViewer from "@/components/pdf-viewer";
import PDF from "@/components/pdf-viewer";

interface homePageProps {
  user: PrismaUser;
}

const HomePage: React.FC<homePageProps> = ({ user }) => {
  const { role, isLoading } = useUser(user.email as string);
  const { count: studentCount } = getStudents(user);
  const { count: facultiesCount } = getFaculties(user);
  const { count: documentCount } = getDocuments();

  if (isLoading) return <></>;
  return (
    <Container size="xl">
      {role === "STUDENT" || role === "FACULTY" ? (
        <Student />
      ) : (
        <>
          <Title order={2}>Dashboard</Title>
          <Space h="md" />
          <Group spacing="xl">
            <StatsCard
              icon={<User size={24} />}
              total={studentCount}
              text="Student"
              color="blue"
            />
            <StatsCard
              icon={<User size={24} />}
              total={facultiesCount}
              text="Faculty"
              color="violet"
            />
            <StatsCard
              icon={<Article size={24} />}
              total={documentCount}
              text="Documents"
              color="orange"
            />
            <StatsCard
              icon={<AlertCircle size={24} />}
              total={documentCount}
              text="Pending"
              color="yellow"
            />
            <StatsCard
              icon={<CircleCheck size={24} />}
              total={documentCount}
              text="Approved"
              color="green"
            />
          </Group>
          <Space h="md" />
          <Group position="apart">
            <AreaChart />
            <BarChart />
          </Group>
          <Space h="xl" />
        </>
      )}
    </Container>
  );
};

const Student = () => {
  return (
    <>
      <Group align="flex-start">
        <Stack sx={{ flex: 2.5 }}>
          <Paper shadow="sm" p="md" radius="md">
            <Title order={3}>Forms</Title>
            <Space h="md" />
            <Group>
              <PDF
                path="./UREC-Form-11-Informed-Consent-Form-BREB-Version.pdf"
                title="UREC-Form-11-Informed Consent Form-BREB-Version"
              />
              <PDF
                path="./Form-1-application-letter-for-ethics-review.pdf"
                title="Form 1- application letter for ethics review"
              />

              <PDF
                path="./UREC-Form-10-Study-Protocol-BREBVersion.pdf"
                title="UREC-Form-10-Study Protocol-BREBVersion"
              />
            </Group>
          </Paper>
          <Paper shadow="sm" p="md" radius="md">
            <Title order={3}>Application</Title>
            <Space h="md" />
            <Group grow>
              <Alert
                icon={<AlertCircle size={16} />}
                sx={{ textAlign: "justify" }}
              >
                Pleased submit UREC-Form-10-Study-Protocol for your research
                entitled &quot;Research title&quot;
              </Alert>
            </Group>
          </Paper>
        </Stack>
        <Stack sx={{ flex: 1 }}>
          <Paper shadow="sm" p="md" radius="md">
            <Title order={3}>Announcement</Title>
            <Space h="md" />
            <Alert
              icon={<AlertCircle size={16} />}
              title="2021 Annual List of Reviewers"
              color="green"
              variant="light"
              sx={{ textAlign: "justify" }}
            >
              <Text size="sm">
                Peer reviewers are critical to the publishing process. They act
                as a filter to ensure research is properly vetted and
                appropriate for our readers, and they provide constructive
                feedback to improves the quality of scholarship found in the
                Journal of Youth Development.
              </Text>
              <Space h="sm" />
              <Text size="sm" weight={500}>
                Posted: 2022-01-05
              </Text>
            </Alert>
            <Space h="xs" />
            <Alert
              icon={<AlertCircle size={16} />}
              title="Envision Yourself as an Author"
              color="green"
              variant="light"
              sx={{ textAlign: "justify" }}
            >
              <Text size="sm">
                For many youth development professionals the publication process
                can seem overwhelming. This 1-hour presentation sets you up for
                success by reviewing publishing benefits, obstacles and myths,
                and how to overcome common mistakes. You&apos;ll come away with
                five tips for getting started, understand the standard article
                components and what reviewers are looking for, and walk through
                the steps in the publishing process so you know what to expect.
                The presenters -- Kate Walker and Theresa Ferrari -- have
                extensive experience as journal authors, reviewers, and JYD
                editors.
              </Text>

              <Space h="sm" />
              <Text size="sm" weight={500}>
                Posted: 2020-10-07
              </Text>
            </Alert>
          </Paper>
        </Stack>
      </Group>
    </>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = protectedRoute(
  async (ctx) => {
    //@ts-ignore
    return { props: { user: JSON.parse(JSON.stringify(ctx.req.user)) } };
  }
);
