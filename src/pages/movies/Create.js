import { useEffect } from "react";
import UnderDevelopemnt from "../../components/UnderDevelopment";

const MovieCreatePage = () => {
  useEffect(() => {
    document.title = "Create a new movie - Movie Rating";
  }, []);

  return <UnderDevelopemnt />;
};

export default MovieCreatePage;
