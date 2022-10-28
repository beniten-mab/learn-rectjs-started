import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const StreamEditPage = () => {
  // const baseUrl = "https://x-django-rest-api.herokuapp.com";
  const baseUrl = "http://127.0.0.1:8000";

  const [validation, setValidation] = useState({});
  const [message, setMessage] = useState();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [website, setWebsite] = useState("");

  const nagivate = useNavigate();
  const params = useParams();

  const fetchStream = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/watch/stream/${params.streamId}`
      );
      const { data } = response;
      setName(data.name);
      setAbout(data.about);
      setWebsite(data.website);
    } catch (error) {}
  };

  useEffect(() => {
    document.title = "Update stream - Movie Rating";
    fetchStream();
  }, []);

  const resetForm = () => {
    setName("");
    setAbout("");
    setWebsite("");
  };

  const onUpdateStream = (event) => {
    event.preventDefault();

    setValidation({});

    axios
      .put(`${baseUrl}/watch/stream/${params.streamId}`, {
        name,
        about,
        website,
      })
      .then(() => {
        toast.info("A new stream platform has been created");
        resetForm();
        return nagivate("/stream");
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
        <h3 className="text-2xl font-bold">Update stream platform</h3>
        <BackButton />
      </div>
      {message ? (
        <div className="bg-red-500 rounded-sm py-2 px-5 text-white">
          <h3 className="font-bold">Error</h3>
          <p>{message}</p>
        </div>
      ) : null}
      <div>
        <form className="grid grid-cols-1 gap-6" onSubmit={onUpdateStream}>
          <label className="block">
            <span className="text-gray-700 required">Name</span>
            <input
              type="text"
              className={
                validation["name"]
                  ? extranClasses + " border-red-500 border-1"
                  : extranClasses
              }
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {validation && validation["name"] ? (
              <span className="text-red-600">{validation["name"]}</span>
            ) : null}
          </label>

          <label className="block">
            <span className="text-gray-700 required">About</span>
            <textarea
              rows="3"
              className={
                validation["about"]
                  ? extranClasses + " border-red-500 border-1"
                  : extranClasses
              }
              onChange={(e) => setAbout(e.target.value)}
              value={about}
            ></textarea>
            {validation && validation["about"] ? (
              <span className="text-red-600">{validation["about"]}</span>
            ) : null}
          </label>

          <label className="block">
            <span className="text-gray-700 required">Website</span>
            <input
              type="url"
              className={
                validation["website"]
                  ? extranClasses + " border-red-500 border-1"
                  : extranClasses
              }
              onChange={(e) => setWebsite(e.target.value)}
              value={website}
            />
            {validation && validation["website"] ? (
              <span className="text-red-600">{validation["website"]}</span>
            ) : null}
          </label>

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

export default StreamEditPage;
