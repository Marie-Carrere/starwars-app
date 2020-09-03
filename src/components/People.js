import React from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async () => {
  const res = await fetch("http://swapi.dev/api/people");
  return res.json();
}

const Planets = () => {
  const { data, status } = useQuery("people", fetchPeople);

  return (
    <div>
      <h2>People</h2>
      { status === "success" && (
        <div>
          {data.results.map(person => <Person key={person.name} person={person} />)}
        </div>
      )}

    </div>
  );
}

export default Planets;