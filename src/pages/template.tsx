/* eslint-disable react/display-name */
import React, { FunctionComponent } from "react";
import Navigation from "@/components/Navigation";

type PageHOCProps = {
  Component: FunctionComponent;
  title: string;
};

const PageHOC =
  ({ Component, title }: PageHOCProps) =>
  () => {
    return (
      <div>
        <Navigation title={title} className="m-4" />
        <Component />
      </div>
    );
  };

export default PageHOC;
