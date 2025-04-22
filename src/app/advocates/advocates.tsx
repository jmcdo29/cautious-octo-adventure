"use client";

import { useEffect, useState } from "react";

import type { advocates as dbAdvocate } from "../../db/schema";
type Advocate = typeof dbAdvocate.$inferSelect;
import { AdvocateSearch } from "./advocate-search";
import { AdvocateTable } from "./advocate-table";

export const Advocates = () => {
  const [page, setPage] = useState(1);
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    console.log("Making HTTP request");
    fetch(`/api/advocates?page=${page}`).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, [setAdvocates, setFilteredAdvocates, page]);

  return (
    <>
      <AdvocateSearch
        advocates={advocates}
        setFilteredAdvocates={setFilteredAdvocates}
      />
      <AdvocateTable
        advocates={filteredAdvocates}
        page={page}
        setPage={setPage}
      />
    </>
  );
};
