import { ComponentProps } from "react";
import { Trans } from "react-i18next";

export type Token = ComponentProps<typeof Trans>["i18nKey"];

export interface TranslateProps extends ComponentProps<typeof Trans> {
  token: Token;
}
