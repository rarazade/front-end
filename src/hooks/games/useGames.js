import { useEffect, useState } from "react";
import { getGames, getGameById, getMeta, getJumbotrons } from "../../services/Games";

export function useGames(filters = {}) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getGames(filters)
      .then(setGames)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]);

  return { games, loading, error };
}

export function useGameDetail(id) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/games/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Game not found");
        return res.json();
      })
      .then(setGame)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  return { game, loading, error };
}

export function useMeta() {
  const [meta, setMeta] = useState({ platforms: [], categories: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMeta()
      .then(setMeta)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { meta, loading };
}

export function useJumbotrons() {
  const [jumbotrons, setJumbotrons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJumbotrons()
      .then(setJumbotrons)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { jumbotrons, loading };
}
