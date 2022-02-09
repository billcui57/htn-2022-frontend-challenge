import React from "react";
import Typography from "@/components/Typography";

type DetailsSectionProps = {
  text?: string | number;
  children?: any;
  className?: string;
  sectionTitle: string | number;
};

const DetailsSection = (props: DetailsSectionProps) => {
  return (
    <span className={props.className}>
      <Typography
        colour="text"
        size="section-head"
        bold
        text={props.sectionTitle}
        className="flex justify-center"
      ></Typography>
      {props.text && (
        <Typography
          colour="text"
          size="base"
          text={props.text}
          className="flex justify-center"
        ></Typography>
      )}

      <div className="flex justify-center">{props.children}</div>
    </span>
  );
};

export default DetailsSection;
