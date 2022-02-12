import React, { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Typography from "@/components/Typography";
import Button from "@/components/Input/Button";
import LeftArrow from "@/svg/LeftArrow";
import DropDownMenu from "@/components/DropDown/DropDownMenu";
import { DropDownItemProps } from "../DropDown/DropDownItem";

type NavigationProps = {
  title: string;
  className?: string;
  isAuthenticated: boolean;
};

const Navigation = (props: NavigationProps) => {
  const router = useRouter();

  const noBackPaths: string[] = ["/", "/login"];

  const shouldShowGoHome = () => {
    return !noBackPaths.includes(router.pathname);
  };
  const handleLoginLogoutButton = () => {
    if (props.isAuthenticated) {
      router.push("/api/auth/logout");
    } else {
      router.push("/api/auth/login");
    }
  };

  const getDropDownItems = (): DropDownItemProps[] => {
    const items: DropDownItemProps[] = [];

    if (shouldShowGoHome()) {
      items.push({
        label: "Go home",
        onClick: () => router.push("/"),
      });
    }

    items.push({
      label: props.isAuthenticated ? "Logout" : "Login",
      onClick: () => handleLoginLogoutButton(),
    });

    return items;
  };

  return (
    <Fragment>
      {/* Mobile */}
      <div className="sm:hidden">
        <div
          className={`${props.className} grid items-center justify-items-center grid-cols-1 `}
        >
          <DropDownMenu items={getDropDownItems()}></DropDownMenu>
          {/* <Button
            onClick={() => router.push("/")}
            type="secondary"
            className={` ${shouldShowGoHome() ? "" : "hidden"}`}
          >
            <Typography
              colour="text"
              size="base"
              bold
              text="Go home"
            ></Typography>
          </Button>
          <Button onClick={() => handleLoginLogoutButton()} type="secondary">
            <Typography
              colour="text"
              size="base"
              bold
              text={props.isAuthenticated ? "Logout" : "Login"}
            ></Typography>
          </Button>*/}
          <Typography
            colour="text"
            size="title"
            bold
            text={props.title}
          ></Typography>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block">
        <div
          className={`${props.className} grid items-center justify-items-center grid-cols-3`}
        >
          <Button
            onClick={() => router.push("/")}
            type="secondary"
            className={` ${shouldShowGoHome() ? "" : "invisible "}`}
          >
            <Typography
              colour="text"
              size="base"
              bold
              text="Go home"
            ></Typography>
          </Button>

          <Typography
            colour="text"
            size="title"
            bold
            text={props.title}
          ></Typography>

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
    </Fragment>
  );
};

export default Navigation;
