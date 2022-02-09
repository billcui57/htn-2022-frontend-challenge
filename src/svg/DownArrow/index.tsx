import SVGDownArrow from "./SVGDownArrow.svg";

type DownArrowProps = {
  className?: string;
};

const DownArrow = (props: DownArrowProps) => {
  return (
    <div className={`w-4 ${props.className}`}>
      <SVGDownArrow></SVGDownArrow>
    </div>
  );
};

export default DownArrow;
