import SVGBorgorMenu from "./SVGBorgorMenu.svg";

type BorgorMenuProps = {
  className?: string;
};

const BorgorMenu = (props: BorgorMenuProps) => {
  return (
    <div className={`w-4 ${props.className}`}>
      <SVGBorgorMenu></SVGBorgorMenu>
    </div>
  );
};

export default BorgorMenu;
