const titleStyle = {
  fontSize: "12px",
  color: "var(--typography-primary)",
  fontFamily: "Inter 24pt",
};

const xAxisStyle = {
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "16px",
  letterSpacing: "-0.12px",
  color: "var(--typography-quaternary)",
  fontFamily: "Inter 24pt",
};

const yAxisStyle = {
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "16px",
  letterSpacing: "-0.12px",
  color: "var(--typography-primary)",
  fontFamily: "Inter 24pt",
};

const yAxisPrimaryStyle = {
  ...yAxisStyle,
  color: "var(--typography-primary)",
};

const yAxisQuaternaryStyle = {
  ...yAxisStyle,
  color: "var(--typography-quaternary)",
};

const legendStyle = {
  color: "var(--typography-primary)",
};

const tooltipWrapperStyle = {
  backgroundColor: "var(--background-secondary)",
};
const tooltipInnerStyle = {
  color: "var(--typography-primary)",
  fontFamily: "Inter 24pt",
};
export {
  titleStyle,
  xAxisStyle,
  yAxisPrimaryStyle,
  legendStyle,
  tooltipWrapperStyle,
  tooltipInnerStyle,
  yAxisQuaternaryStyle,
};
