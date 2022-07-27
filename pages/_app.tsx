import "../styles/globals.css";
import type { AppProps } from "next/app";
import Mantine from "@/components/mantine";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/layout";
import { SWRConfig } from "swr";
import { fetcher } from "@/utils/fetcher";
import { ModalsProvider } from "@mantine/modals";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ fetcher }}>
        <Mantine>
          <ModalsProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ModalsProvider>
        </Mantine>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
