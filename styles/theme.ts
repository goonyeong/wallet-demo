import { DefaultTheme, css } from "styled-components";

// variables
const variable = {};

// mixins
const mixin = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

// colors
const lightColors = {
  text_color: "#000000",
  background_color: "#ffffff",
  primary_color: "#EBD671",
  secondary_color: "#E5EFC1",
  nav_color: "rgba(200, 200, 200, 0.8)",
};

const darkColors = {
  text_color: "#ffffff",
  background_color: "#222831",
  primary_color: "#6FB2D2",
  secondary_color: "#EEEEEE",
  nav_color: "rgba(10, 10, 10, 0.8)",
};

// export types for styled.d.ts
export type TypeVariable = typeof variable;
export type TypeMixin = typeof mixin;
export type TypeLightColor = typeof lightColors;
export type TypeDarkColor = typeof darkColors;

// create and export theme
const lightTheme: DefaultTheme = {
  colors: lightColors,
  variable,
  mixin,
};

const darkTheme: DefaultTheme = {
  colors: darkColors,
  variable,
  mixin,
};

export { lightTheme, darkTheme };
