import { useEffect } from "react";
import UnderDevelopemnt from "../../components/UnderDevelopment";

const ReviewListPage = () => {
  useEffect(() => {
    document.title = "Reivews - Movie Rating";
  }, []);

  return <UnderDevelopemnt />;
};

export default ReviewListPage;
