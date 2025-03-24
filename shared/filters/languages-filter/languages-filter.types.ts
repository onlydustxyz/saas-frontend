export interface LanguagesFilterProps {
  languagesIds: string[];
  onSelect: (languagesIds: string[]) => void;
  fullWidth?: boolean;
}
