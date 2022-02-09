import HomeContainer from "@/containers/Home";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import PageHOC from "@/pages/template";

const HomePage: NextPage = () => {
  return <HomeContainer />;
};

export default PageHOC({ Component: HomePage, title: "Browse Events" });
