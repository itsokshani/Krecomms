import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import FilterGroup from "./FilterGroup";

const MovieList = ({ type, title, emoji }) => {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });

  //fetching movies when the component loads
  useEffect(() => {
    fetchMovies();
  }, []);

  //Here we are applying rating and filter
  useEffect(() => {
    let result = movies;

    // Filter movies by minimum rating
    if (minRating > 0) {
      result = result.filter(
        (movie) => movie.vote_average >= minRating
      );
    }

    //sorting the movies
    if (sort.by !== "default") {
      result = _.orderBy(result,
        [sort.by],
        [sort.order]
      );
    }

    setFilterMovies(result);
  }, [movies, minRating, sort]);

 const fetchMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("TMDB Error:", data);
      return;
    }

    setMovies(data.results || []);
  } catch (error)
   {
    console.error("Fetch Error:", error);
  }
};

  const handleFilter = (rate) => {
  if (rate === minRating) {
    setMinRating(0);
  } else {
    setMinRating(rate);
  }
};

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="movie_list" id={type}>
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          {title}{" "}
          <img src={emoji} alt={`${emoji} icon`} className="navbar_emoji" />
        </h2>

        <div className="align_center movie_list_fs">
          <FilterGroup
            minRating={minRating}
            onRatingClick={handleFilter}
            ratings={[8, 7, 6]}
          />

          <select
            name="by"
            id=""
            onChange={handleSort}
            value={sort.by}
            className="movie_sorting"
          >
            <option value="default">SortBy</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>
          <select
            name="order"
            id=""
            onChange={handleSort}
            value={sort.order}
            className="movie_sorting"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>

      <div className="movie_cards">
        {filterMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;