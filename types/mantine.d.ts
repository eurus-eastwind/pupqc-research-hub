import { Tuple, DefaultMantineColor } from "@mantine/core";

type CustomColors = "maroon" | DefaultMantineColor;

export interface TailwindColor extends MantineTheme {
  colors: MantineThemeColors & { tailwind: TailwindCSSColors };
}

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors, Tuple<string, 10>>;
  }
}
