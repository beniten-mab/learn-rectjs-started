import loading from "../assets/lottiefiles/loading.json";
import Lottie from "react-lottie";

const IsLoading = (props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="bg-white shadow grid place-items-center h-[320px] lg:h-[600px] rounded">
      <div className="text-center">
        <Lottie options={defaultOptions} height={200} width={400} />
        <h3 className="font-bold text-xl">{props.title || "Loading..."}</h3>
      </div>
    </div>
  );
};

export default IsLoading;
