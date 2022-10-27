import { useEffect } from "react";
import UnderDevelopemnt from "../../components/UnderDevelopment";

const MovieDetailPage = () => {
  useEffect(() => {
    document.title = "Create a new movie - Movie Rating";
  }, []);

  return <UnderDevelopemnt />;
};

export default MovieDetailPage;
