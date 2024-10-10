import { DatePickerNextUiAdapter } from "@/design-system/atoms/date-picker/adapters/next-ui/next-ui.adapter";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { DatePickerPort } from "../date-picker.types";

export function DatePicker(props: DatePickerPort) {
  return withComponentAdapter<DatePickerPort>(DatePickerNextUiAdapter)(props);
}
