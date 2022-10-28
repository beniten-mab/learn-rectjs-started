import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <button
      onClick={goBack}
      className="bg-gray-800 py-2 px-5 rounded flex gap-3 text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
        />
      </svg>
      <span>Back</span>
    </button>
  );
};

export default BackButton;
