interface Variants {}

interface ClassNames {
  base: string;
}

export interface TableSearchPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  value?: string;
  onChange: (value?: string) => void;
  onDebouncedChange: (value?: string) => void;
}