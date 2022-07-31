import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  List,
  Paper,
  Skeleton,
  Space,
  Spoiler,
  Text,
  TextInput,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import React, { useState } from "react";
import { Folder as FolderIcon, Search, Trash } from "tabler-icons-react";
import Folder from "@/components/folder";
import AddDocumentModal from "@/components/modal/addDocument";
import { getDocuments } from "@/utils/documents.routes";
import { Documents } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useUser } from "@/utils/user.routes";
import PDF from "./pdf-viewer";

interface documnetProps {
  title?: string;
  role?: string;
}

const Document: React.FC<documnetProps> = ({ title, role }) => {
  const { data: session } = useSession();
  const { user, isLoading: isUserLoading } = useUser(
    session?.user.email as string
  );
  const { document, isLoading } = getDocuments(role);
  const [researchData, setResearchData] = useState<Documents | null>(null);

  if (isUserLoading) return <></>;

  return (
    <Grid grow>
      <Grid.Col span={7}>
        <Group>
          {title && (
            <Title sx={{ flex: 1 }} order={3}>
              {title}
            </Title>
          )}
          <TextInput
            radius="md"
            placeholder="Search"
            rightSection={<Search size={14} />}
          />
          {role && <AddDocumentModal role={role} />}
        </Group>
        <Space h="md" />
        {isLoading ? (
          <>
            <Group>
              <Skeleton height={70} radius="md" width="15rem" />
              <Skeleton height={70} radius="md" width="15rem" />
              <Skeleton height={70} radius="md" width="15rem" />
              <Skeleton height={70} radius="md" width="15rem" />
              <Skeleton height={70} radius="md" width="15rem" />
            </Group>
          </>
        ) : (
          <Group>
            {document?.map((d) => (
              <Folder
                key={d.id}
                title={d.title}
                onClick={() => setResearchData({ ...d })}
                style={{ maxWidth: "20rem" }}
              />
            ))}
          </Group>
        )}
      </Grid.Col>
      {researchData && (
        <Grid.Col span={2}>
          <Paper p="xl" radius="md" shadow="sm" sx={{ maxWidth: "30rem" }}>
            <Title order={4}>{researchData?.title}</Title>
            <Space h="xs" />
            <Divider />
            <Space h="xs" />

            <Center>
              <Box my="xl">
                <Avatar radius={100} size="xl">
                  <FolderIcon size={40} />
                </Avatar>
              </Box>
            </Center>
            <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
              <TypographyStylesProvider>
                <div
                  dangerouslySetInnerHTML={{
                    __html: researchData?.abstract as string,
                  }}
                />
              </TypographyStylesProvider>
            </Spoiler>
            <Text weight={500}>Researchers Names:</Text>
            <List type="ordered">
              {researchData?.researchers.map((r: string, i) => (
                <List.Item key={i}>{r}</List.Item>
              ))}
            </List>
            <Space h="xs" />
            <PDF
              path="./Research_on_the_Application_of_Face_Recognition_Sy-1.pdf"
              title={researchData?.title}
            />
            {user.role !== "STUDENT" && (
              <>
                <Space h="xs" />
                <Group spacing="sm">
                  <Button
                    style={{ flex: 1 }}
                    fullWidth
                    color="blue"
                    variant="light"
                  >
                    Edit
                  </Button>
                  <ActionIcon size="lg" color="red" radius="md" variant="hover">
                    <Trash size={18} />
                  </ActionIcon>
                </Group>
              </>
            )}
          </Paper>
        </Grid.Col>
      )}
    </Grid>
  );
};

export default Document;
