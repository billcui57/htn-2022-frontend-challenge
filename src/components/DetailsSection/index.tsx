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
        className="flex justify-center mb-2"
      ></Typography>

      <div className="flex justify-center">
        {props.text && (
          <Typography colour="text" size="base" text={props.text}></Typography>
        )}
        {props.children}
      </div>
    </span>
  );
};

export default DetailsSection;
