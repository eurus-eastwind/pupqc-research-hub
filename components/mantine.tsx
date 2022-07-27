import React from "react";
import { MantineProvider } from "@mantine/core";

interface mantineProps {
  children: React.ReactNode;
}

const Mantine: React.FC<mantineProps> = ({ children }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colors: {
          maroon: ["#890F0D", "#630606"],
        },
      }}
    >
      {children}
    </MantineProvider>
  );
};

export default Mantine;
