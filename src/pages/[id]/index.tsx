import React, { useState } from "react";
import { TEventID } from "@/types";
import { useRouter } from "next/router";
import DetailsContainer from "@/containers/Details";
import PageHOC from "@/pages/template";

const DetailsPage = () => {
  const router = useRouter();

  const TEventID: TEventID = router.query.id;

  if (!TEventID) {
    return null;
  }

  return <DetailsContainer TEventID={TEventID} />;
};

export default PageHOC({ Component: DetailsPage, title: "Event Details" });
