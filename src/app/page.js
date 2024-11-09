import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import Hero from "./components/Hero";
import Presentazione from "./components/Presentazione";
import Information from "./components/Informazioni";
import Banner from "./components/BannerMacarons";
import Delizie from "./components/Delizie";

export default function Home() {
  return (
    <>
    <Hero></Hero>
    <Presentazione></Presentazione>
    <Information></Information>
    <Banner></Banner>
    <Delizie></Delizie>
    </>
  );
}
