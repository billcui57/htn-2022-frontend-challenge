import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Typography from "@/components/Typography";
import Button from "@/components/Input/Button";
import LeftArrow from "@/svg/LeftArrow";

type NavigationProps = {
  title: string;
  className: string;
};

const Navigation = (props: NavigationProps) => {
  const router = useRouter();

  const shouldShowGoHome = () => {
    return router.pathname != "/";
  };

  return (
    <div
      className={`${props.className} grid items-center justify-items-center grid-cols-1 sm:grid-cols-3`}
    >
      <Button
        onClick={() => router.push("/")}
        type="secondary"
        className={shouldShowGoHome() ? "" : "hidden sm:block sm:invisible "}
      >
        <Typography colour="text" size="base" bold text="Go home"></Typography>
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
