"use client";

import { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { advocates as dbAdvocates } from "../../db/schema";

type Advocate = typeof dbAdvocates.$inferSelect;

interface AdvocateTableProps {
  advocates: Advocate[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const formatPhoneNumber = (phone: number): string => {
  const phoneN = phone.toString();
  return `(${phoneN.substring(0, 3)}) ${phoneN.substring(
    3,
    6
  )}-${phoneN.substring(6)}`;
};

export const AdvocateTable = ({
  advocates,
  page,
  setPage,
}: Readonly<AdvocateTableProps>) => {
  const noAdvocates = advocates.length === 0;

  const pageForward = () => {
    setPage(page + 1);
  };

  const pageBackward = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = 1;
    }
    setPage(newPage);
  };

  const changePageOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (parseInt(val) === page) {
      return;
    }
    setPage(parseInt(val));
  };

  return (
    <div style={{ margin: "1em 0" }}>
      {noAdvocates ? (
        <div>No advocates found with the search parameters provided.</div>
      ) : (
        <table style={{ margin: "1em 0", borderRadius: "1em" }}>
          <thead>
            <tr style={{ borderTop: "1px solid black" }}>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Degree</th>
              <th>Specialties</th>
              <th>Years of Experience</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {advocates.map((advocate) => {
              return (
                <tr
                  key={advocate.phoneNumber}
                  style={{ borderTop: "1px solid black" }}
                >
                  <td>{advocate.firstName}</td>
                  <td>{advocate.lastName}</td>
                  <td>{advocate.city}</td>
                  <td>{advocate.degree}</td>
                  <td>
                    <ul>
                      {advocate.specialties.sort().map((s, index) => (
                        <li key={index}>{s}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{advocate.yearsOfExperience}</td>
                  <td>{formatPhoneNumber(advocate.phoneNumber)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={pageBackward}
          hidden={page < 2}
          disabled={noAdvocates && page === 1}
        >
          &lt;
        </button>
        <input
          defaultValue={page}
          type="number"
          disabled={noAdvocates}
          onBlur={changePageOnBlur}
        ></input>
        <button onClick={pageForward} disabled={noAdvocates}>
          &gt;
        </button>
      </div>
    </div>
  );
};
