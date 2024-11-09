import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import Hero from "@/components/home/hero/hero";
import Presentation from "@/components/home/presentation/presentation";
import Banner from "@/components/home/banner/banner";
import Products from "@/components/home/products/products";
import Information from "@/components/home/information/information";

export default function Home() {
  return (
    <>
    <Hero></Hero>
    <Presentation></Presentation>
    <Information></Information>
    <Banner></Banner>
    <Products></Products>
    </>
  );
}
