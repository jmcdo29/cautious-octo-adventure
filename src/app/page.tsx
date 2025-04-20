"use client";

import { Header } from "./header";
import { Advocates } from "./advocates/advocates";
import { Footer } from "./footer";

export default function Home() {
  return (
    <main style={{ margin: "24px" }}>
      <Header />
      <Advocates />
      <Footer />
    </main>
  );
}
