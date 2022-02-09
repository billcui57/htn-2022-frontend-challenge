import React, { useState } from "react";
import { EventID } from "@/types";
import { useRouter } from "next/router";
import DetailsContainer from "@/containers/Details";

const BrowsePage = () => {
  const router = useRouter();

  const eventId: EventID = router.query.id;

  if (!eventId) {
    return null;
  }

  return <DetailsContainer eventId={eventId} />;
};

export default BrowsePage;
