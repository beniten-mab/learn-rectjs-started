import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import axios from "./../../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const MovieEditPage = () => {
  const [stream, setStream] = useState([]);
  const [validation, setValidation] = useState({});
  const [message, setMessage] = useState();

  const [platform, setPlatform] = useState("DEFAULT");
  const [title, setTitle] = useState("");
  const [storyline, setStoryline] = useState("");
  const [active, setActive] = useState(true);

  const nagivate = useNavigate();
  const params = useParams();

  const fetchStream = async () => {
    try {
      const response = await axios.get(`/watch/stream`);
      setStream(response.data);
    } catch (error) {}
  };

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`/watch/${params.movieId}`);
      const { data } = response;
      setPlatform(data.platform);
      setTitle(data.title);
      setStoryline(data.storyline);
      setActive(data.active);
    } catch (error) {}
  };

  useEffect(() => {
    document.title = "Edit movie - Movie Rating";
    fetchStream();
    fetchMovie();
  }, []);

  const resetForm = () => {
    setPlatform("DEFAULT");
    setTitle("");
    setStoryline("null");
    setActive(true);
  };

  const onUpdateMovie = (event) => {
    event.preventDefault();

    setValidation({});

    axios
      .put(`/watch/${params.movieId}`, {
        platform,
        title,
        storyline,
        active,
      })
      .then(() => {
        toast.info("A moive has been created");
        resetForm();
        return nagivate("/");
      })
      .catch((error) => {
        const { message, response } = error;
        if (message) {
          setMessage(message);
        }
        if (response) {
          const { data } = response;
          if (data) {
            setValidation(data);
          }
        }
      });
  };

  const extranClasses = "mt-1 block w-full";

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Edit movie</h3>
        <BackButton />
      </div>
      {message ? (
        <div className="bg-red-500 rounded-sm py-2 px-5 text-white">
          <h3 className="font-bold">Error</h3>
          <p>{message}</p>
        </div>
      ) : null}
      <div>
        <form className="grid grid-cols-1 gap-6" onSubmit={onUpdateMovie}>
          <label className="block">
            <span className="text-gray-700 required">Stream Platform</span>
            <select
              className={
                validation["platform"]
                  ? extranClasses + " border-red-500 border-1"
                  : extranClasses
              }
              onChange={(e) => setPlatform(e.target.value)}
              value={platform}
            >
              <option defaultValue disabled>
                Stream Platform
              </option>
              {stream &&
                stream.map((item, key) => (
                  <option value={item.id} key={key}>
                    {item.name}
                  </option>
                ))}
            </select>
            {validation && validation["platform"] ? (
              <span className="text-red-600">{validation["platform"]}</span>
            ) : null}
          </label>

          <label className="block">
            <span className="text-gray-700 required">Title</span>
            <input
              type="text"
              className={
                validation["title"]
                  ? extranClasses + " border-red-500 border-1"
                  : extranClasses
              }
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            {validation && validation["title"] ? (
              <span className="text-red-600">{validation["title"]}</span>
            ) : null}
          </label>

          <label className="block">
            <span className="text-gray-700 required">Storyline</span>
            <textarea
              rows="3"
              className={
                validation["storyline"]
                  ? extranClasses + " border-red-500 border-1"
                  : extranClasses
              }
              onChange={(e) => setStoryline(e.target.value)}
              value={storyline}
            ></textarea>
            {validation && validation["storyline"] ? (
              <span className="text-red-600">{validation["storyline"]}</span>
            ) : null}
          </label>

          <div className="block">
            <div className="mt-2">
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={active}
                    checked={active}
                    onChange={() => setActive(!active)}
                  />
                  <span className="ml-2">It is still available?</span>
                </label>
              </div>
            </div>
          </div>
          <div className="block">
            <button
              type="submit"
              className="py-2 px-5 text-white bg-green-800 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieEditPage;
