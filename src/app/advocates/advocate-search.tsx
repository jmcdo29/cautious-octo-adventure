"use client";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import type { advocates as dbAdvocate } from "../../db/schema";
type Advocate = typeof dbAdvocate.$inferSelect;

interface AdvocateSearchProps {
  advocates: Advocate[];
  setFilteredAdvocates: Dispatch<SetStateAction<Advocate[]>>;
}

export const AdvocateSearch = ({
  advocates,
  setFilteredAdvocates,
}: Readonly<AdvocateSearchProps>) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const localSearchTerm = e.target.value;
    setSearchTerm(localSearchTerm);

    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(localSearchTerm) ||
        advocate.lastName.includes(localSearchTerm) ||
        advocate.city.includes(localSearchTerm) ||
        advocate.degree.includes(localSearchTerm) ||
        advocate.specialties.some((specs) => specs.includes(localSearchTerm)) ||
        advocate.yearsOfExperience.toString().includes(localSearchTerm)
      );
    });
    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    setFilteredAdvocates(advocates);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <p>
          Searching for: <span>{searchTerm}</span>
        </p>
      </div>
      <input onChange={onChange} />
      <button onClick={onClick}>Reset Search</button>
    </div>
  );
};
