import SVGUpArrow from "./SVGUpArrow.svg";

type UpArrowProps = {
  className?: string;
};

const UpArrow = (props: UpArrowProps) => {
  return (
    <div className={`w-4 ${props.className}`}>
      <SVGUpArrow></SVGUpArrow>
    </div>
  );
};

export default UpArrow;
