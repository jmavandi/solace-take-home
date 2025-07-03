"use client";

import { useEffect, useState } from "react";
import { Advocate, AdvocatesResponse } from "../types/advocate";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonResponse: AdvocatesResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching advocates:", error);
        setError("Failed to load advocates. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    console.log("filtering advocates...");
    const filtered = advocates.filter((advocate) => {
      const searchLower = newSearchTerm.toLowerCase();
      return (
        advocate.firstName.toLowerCase().includes(searchLower) ||
        advocate.lastName.toLowerCase().includes(searchLower) ||
        advocate.city.toLowerCase().includes(searchLower) ||
        advocate.degree.toLowerCase().includes(searchLower) ||
        advocate.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchLower)
        ) ||
        advocate.yearsOfExperience.toString().includes(searchLower)
      );
    });

    setFilteredAdvocates(filtered);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  if (isLoading) {
    return (
      <main style={{ margin: "24px" }}>
        <h1>Solace Advocates</h1>
        <p>Loading advocates...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ margin: "24px" }}>
        <h1>Solace Advocates</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </main>
    );
  }

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <label htmlFor="search-input">Search advocates:</label>
        <p>
          Searching for: <span>{searchTerm}</span>
        </p>
        <input
          id="search-input"
          style={{ border: "1px solid black" }}
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search advocates..."
          aria-describedby="search-description"
        />
        <button onClick={handleResetSearch}>Reset Search</button>
        <div
          id="search-description"
          style={{ fontSize: "0.8em", color: "#666" }}
        >
          Search by name, city, degree, specialties, or years of experience
        </div>
      </div>
      <br />
      <br />
      <div>
        <h2>Advocate Directory</h2>
        <p>
          Found {filteredAdvocates.length} advocate
          {filteredAdvocates.length !== 1 ? "s" : ""}
        </p>
        <table role="table" aria-label="Advocates directory">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">City</th>
              <th scope="col">Degree</th>
              <th scope="col">Specialties</th>
              <th scope="col">Years of Experience</th>
              <th scope="col">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdvocates.map((advocate, index) => {
              return (
                <tr key={advocate.id || index}>
                  <td>{advocate.firstName}</td>
                  <td>{advocate.lastName}</td>
                  <td>{advocate.city}</td>
                  <td>{advocate.degree}</td>
                  <td>
                    {advocate.specialties.map((specialty, specialtyIndex) => (
                      <div key={specialtyIndex}>{specialty}</div>
                    ))}
                  </td>
                  <td>{advocate.yearsOfExperience}</td>
                  <td>{advocate.phoneNumber.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
