import { tv } from "tailwind-variants";

export const CardProjectCategoryDefaultVariants = tv({
  slots: {
    base: "flex aspect-video max-h-[192px] w-full flex-col items-center justify-center gap-lg rounded-lg p-md transition-colors",
    icon: "text-inherit",
    name: "capitalize",
  },
  variants: {
    // TODO @Mehdi refactor color definition
    color: {
      cosmic_night: {
        base: "gradient-cosmic-night",
        icon: "text-inherit",
      },
      deep_ocean: {
        base: "gradient-deep-ocean",
        icon: "text-[#6DA0EF]",
      },
      velvet_dusk: {
        base: "gradient-velvet-dusk",
        icon: "text-[#CB6B9F]",
      },
      arctic_abyss: {
        base: "gradient-arctic-abyss",
        icon: "text-[#6AD09D]",
      },
      ember_shadow: {
        base: "gradient-ember-shadow",
        icon: "text-[#CDA142]",
      },
      mystic_twilight: {
        base: "gradient-mystic-twilight",
        icon: "text-[#8D79D7]",
      },
    },
  },
  defaultVariants: {
    color: "cosmic_night",
  },
});
