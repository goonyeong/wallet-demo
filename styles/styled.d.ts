import "styled-components";
import {
  TypeMixin,
  TypeVariable,
  TypeLightColor,
  TypeDarkColor,
} from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    variable: TypeVariable;
    mixin: TypeMixin;
    colors: TypeLightColor | TypeDarkColor;
  }
}
