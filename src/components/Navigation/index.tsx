import React from "react";
import Link from "next/link";
import router, { useRouter } from "next/router";
import Typography from "@/components/Typography";
import Button from "@/components/Input/Button";
import LeftArrow from "@/svg/LeftArrow";

type NavigationProps = {
  title: string;
  className: string;
};

const Navigation = (props: NavigationProps) => {
  return (
    <div
      className={`${props.className} grid items-center justify-items-center grid-cols-1 sm:grid-cols-3`}
    >
      <Button onClick={() => router.back()} type="transparent">
        <LeftArrow></LeftArrow>
      </Button>

      <Typography
        colour="text"
        size="title"
        bold
        text={props.title}
      ></Typography>

      <div className="invisible"></div>
    </div>
  );
};

export default Navigation;
