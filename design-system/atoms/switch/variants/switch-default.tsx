import { SwitchNextUiAdapter } from "@/design-system/atoms/switch/adapters/next-ui/next-ui.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { SwitchPort } from "../switch.types";

export function Switch(props: SwitchPort) {
  return withComponentAdapter<SwitchPort>(SwitchNextUiAdapter)(props);
}
