import SVGLeftArrow from "./SVGLeftArrow.svg";

type LeftArrowProps = {
  className?: string;
};

const LeftArrow = (props: LeftArrowProps) => {
  return (
    <div className={`w-4 ${props.className}`}>
      <SVGLeftArrow></SVGLeftArrow>
    </div>
  );
};

export default LeftArrow;
