import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Typography from "@/components/Typography";
import Button from "@/components/Input/Button";
import LeftArrow from "@/svg/LeftArrow";

type NavigationProps = {
  title: string;
  className: string;
  isAuthenticated: boolean;
};

const Navigation = (props: NavigationProps) => {
  const router = useRouter();

  const noBackPaths: string[] = ["/", "/login"];

  const shouldShowGoHome = () => {
    return !noBackPaths.includes(router.pathname);
  };
  const handleLoginLogoutButton = () => {
    console.log("hi");
    if (props.isAuthenticated) {
      router.push("/api/auth/logout");
    } else {
      router.push("/api/auth/login");
    }
  };

  return (
    <div
      className={`${props.className} grid items-center justify-items-center grid-cols-1 sm:grid-cols-3 space-y-2`}
    >
      <div className="order-1 sm:order-1">
        <Button
          onClick={() => router.push("/")}
          type="secondary"
          className={` ${
            shouldShowGoHome() ? "" : "hidden sm:block sm:invisible "
          }`}
        >
          <Typography
            colour="text"
            size="base"
            bold
            text="Go home"
          ></Typography>
        </Button>
      </div>

      <div className="order-3 sm:order-2">
        <Typography
          colour="text"
          size="title"
          bold
          text={props.title}
        ></Typography>
      </div>

      <div className="order-2 sm:order-3">
        <Button onClick={() => handleLoginLogoutButton()} type="secondary">
          <Typography
            colour="text"
            size="base"
            bold
            text={props.isAuthenticated ? "Logout" : "Login"}
          ></Typography>
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
