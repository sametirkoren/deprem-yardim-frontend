import Head from "next/head";
import styles from "@/styles/Home.module.css";

import Container from "@mui/material/Container";
import LeafletMap from "@/components/UI/Map";
import { useState, useCallback } from "react";
import Drawer from "@/components/UI/Drawer/Drawer";
import FooterBanner from "@/components/UI/FooterBanner/FooterBanner";

import { Data, MarkerData } from "../mocks/types";

export default function Home({ results }: { results: MarkerData[] }) {
  const [isOpen, setisOpen] = useState(false);
  const [drawerData, setDrawerData] = useState<any>();

  const toggleDrawer = useCallback(
    () => (event: React.KeyboardEvent | React.MouseEvent, markerData?: any) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      )
        return;

      setisOpen((prev) => !prev);

      if (markerData) {
        setDrawerData(markerData);
      }
    },
    []
  );

  return (
    <>
      <Head>
        <title>Afet Haritası | Anasayfa</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Container maxWidth={false} disableGutters>
          <LeafletMap onClickMarker={toggleDrawer()} data={results} />
        </Container>
        {drawerData && (
          <Drawer data={drawerData} isOpen={isOpen} toggler={toggleDrawer()} />
        )}
        <FooterBanner />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  // Server-side requests are mocked by `mocks/server.ts`.
  const res = await fetch(
    "https://public-sdc.trendyol.com/discovery-web-websfxgeolocation-santral/geocode?address=gaziantep"
  );
  const data = (await res.json()) as Data;
  const results = data.results;

  return {
    props: {
      results,
    },
  };
}
