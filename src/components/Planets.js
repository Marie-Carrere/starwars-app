import React, { useState } from "react";
import { usePaginatedQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (key, page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
}

const Planets = () => {
  const [page, setPage] = useState(1);
  const {
    resolvedData,
    latestData,
    status
  } = usePaginatedQuery(["planets", page], fetchPlanets);

  return (
    <div>
      <h2>Planets</h2>
      { status === "success" && (
        <div>
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous page
          </button>
          <span>{page}</span>
          <button
            onClick={() => setPage(prev => (!latestData || !latestData.next ? prev : prev + 1))}
            disabled={!latestData || !latestData.next}
          >
            Next page
          </button>
          <>
            {resolvedData.results.map(planet => <Planet key={planet.name} planet={planet} />)}
          </>
        </div>
      )}

    </div>
  );
}

export default Planets;