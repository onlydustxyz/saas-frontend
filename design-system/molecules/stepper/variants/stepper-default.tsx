import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { StepperDefaultAdapter } from "../adapters/default/default.adapter";
import { StepperPort } from "../stepper.types";

export function Stepper(props: StepperPort) {
  return withComponentAdapter<StepperPort>(StepperDefaultAdapter)(props);
}
