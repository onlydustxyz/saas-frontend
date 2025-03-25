import { ComponentProps } from "react";
import { Trans } from "react-i18next";

type Token = ComponentProps<typeof Trans>["i18nKey"];

export interface TranslateProps extends ComponentProps<typeof Trans> {
  token: Token;
}
