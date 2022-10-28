import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MovieCreatePage = () => {
  // const baseUrl = "https://x-django-rest-api.herokuapp.com";
  const baseUrl = "http://127.0.0.1:8000";

  const [stream, setStream] = useState([]);
  const [validation, setValidation] = useState({});
  const [message, setMessage] = useState();

  const [platform, setPlatform] = useState(null);
  const [title, setTitle] = useState("");
  const [storyline, setStoryline] = useState("");
  const [active, setActive] = useState(true);

  const nagivate = useNavigate();

  const fetchStream = async () => {
    try {
      const response = await axios.get(`${baseUrl}/watch/stream`);
      setStream(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    document.title = "Create a new movie - Movie Rating";
    fetchStream();
  }, []);

  const resetForm = () => {
    setPlatform("");
    setTitle("");
    setStoryline("");
    setActive(true);
  };

  const onCreateMovie = (event) => {
    event.preventDefault();

    setValidation({});

    axios
      .post(`${baseUrl}/watch`, {
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
        <h3 className="text-2xl font-bold">Create a new movie</h3>
        <BackButton />
      </div>
      {message ? (
        <div className="bg-red-500 rounded-sm py-2 px-5 text-white">
          <h3 className="font-bold">Error</h3>
          <p>{message}</p>
        </div>
      ) : null}
      <div>
        <form className="grid grid-cols-1 gap-6" onSubmit={onCreateMovie}>
          <label className="block">
            <span className="text-gray-700 required">Stream Platform</span>
            <select
              className={
                validation["platform"]
                  ? extranClasses + " border-red-500 border-1"
                  : extranClasses
              }
              onChange={(e) => setPlatform(e.target.value)}
              defaultValue={"DEFAULT"}
            >
              <option value={"DEFAULT"} disabled>
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
                    value={true}
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
              className="py-2 px-5 text-white bg-gray-800 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieCreatePage;
