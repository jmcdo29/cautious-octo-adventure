"use client";

import { useEffect, useState } from "react";

import type { advocates as dbAdvocate } from "../../db/schema";
type Advocate = typeof dbAdvocate.$inferSelect;
import { AdvocateSearch } from "./advocate-search";
import { AdvocateTable } from "./advocate-table";

export const Advocates = () => {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, [setAdvocates, setFilteredAdvocates]);

  return (
    <>
      <AdvocateSearch
        advocates={advocates}
        setFilteredAdvocates={setFilteredAdvocates}
      />
      <AdvocateTable advocates={filteredAdvocates} />
    </>
  );
};
