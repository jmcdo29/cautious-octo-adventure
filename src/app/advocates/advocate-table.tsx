"use client";

import type { advocates as dbAdvocates } from "../../db/schema";

type Advocate = typeof dbAdvocates.$inferSelect;

interface AdvocateTableProps {
  advocates: Advocate[];
}

const formatPhoneNumber = (phone: number): string => {
  const phoneN = phone.toString();
  return `(${phoneN.substring(0, 3)}) ${phoneN.substring(
    3,
    6
  )}-${phoneN.substring(6)}`;
};

export const AdvocateTable = ({ advocates }: Readonly<AdvocateTableProps>) => {
  return (
    <div style={{ margin: "1em 0" }}>
      {!advocates.length ? (
        <div>No advocates found with the search parameters provided.</div>
      ) : (
        <table>
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
                    {advocate.specialties.sort().map((s) => (
                      <div key={s}>{s}</div>
                    ))}
                  </td>
                  <td>{advocate.yearsOfExperience}</td>
                  <td>{formatPhoneNumber(advocate.phoneNumber)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
