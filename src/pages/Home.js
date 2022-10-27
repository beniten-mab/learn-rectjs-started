import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const baseUrl = "http://127.0.0.1:8000";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${baseUrl}/watch`);
      setMovies(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Movie List</h3>
        <Link to="/movie/create">
          <button className="py-2 px-5 bg-gray-800 text-white rounded">
            Add new movie
          </button>
        </Link>
      </div>
      <div className="space-y-3">
        {movies &&
          movies.map((movie, key) => (
            <div className="bg-white p-4 rounded shadow space-y-2" key={key}>
              <h3 className="text-2xl font-bold">{movie.title}</h3>
              <div className="space-y-1">
                <p>{movie.storyline}</p>
                <div className="flex gap-2 text-gray-500">
                  <span>10 Stars</span>
                  <span>—</span>
                  <span>{movie.reviews.length} Reviews</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
