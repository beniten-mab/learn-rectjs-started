import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// const baseUrl = "https://x-django-rest-api.herokuapp.com";
const baseUrl = "http://127.0.0.1:8000";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${baseUrl}/watch`);
      setMovies(response.data);
    } catch (error) {}
  };

  const deleteMovie = (movie) => {
    axios.delete(`${baseUrl}/watch/${movie.id}`).then(() => {
      setMovies([]);

      toast.success("Movie has been deleted");

      fetchMovies();
    });
  };

  useEffect(() => {
    document.title = "Home - Movie Rating";
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
            <div
              className="bg-white p-4 rounded shadow space-y-2 group"
              key={key}
            >
              <div className="flex">
                <div className="w-[80%]">
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
                <div className="w-[20%] hidden group-hover:block">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      to={"/movie/edit/" + movie.id}
                      className="p-2 bg-green-500 text-white rounded flex gap-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </Link>
                    <button
                      className="p-2 bg-red-500 text-white rounded flex gap-3"
                      onClick={() => deleteMovie(movie)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
