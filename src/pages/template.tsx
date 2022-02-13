/* eslint-disable react/display-name */
import React, { FunctionComponent } from "react";
import Navigation from "@/components/Navigation";
import { useUser } from "@auth0/nextjs-auth0";
import Typography from "@/components/Typography";

type PageHOCProps = {
  Component: FunctionComponent;
  title: string;
};

const PageHOC = ({ Component, title }: PageHOCProps) => {
  const EnrichedComponent = () => {
    const { user, error, isLoading } = useUser();

    if (isLoading)
      return (
        <Typography
          text="Loading..."
          colour="text"
          size="base"
          bold
          className="flex justify-center"
        ></Typography>
      );

    return (
      <div>
        <Navigation
          title={title}
          className="mb-4 mt-2"
          isAuthenticated={!!user}
        />
        <Component />
      </div>
    );
  };

  return EnrichedComponent;
};

export default PageHOC;
