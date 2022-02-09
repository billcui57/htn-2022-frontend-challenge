import React, { useState } from "react";
import { EventID } from "@/types";
import { useRouter } from "next/router";
import DetailsContainer from "@/containers/Details";
import PageHOC from "@/pages/template";

const DetailsPage = () => {
  const router = useRouter();

  const eventId: EventID = router.query.id;

  if (!eventId) {
    return null;
  }

  return <DetailsContainer eventId={eventId} />;
};

export default PageHOC({ Component: DetailsPage, title: "Event Details" });
