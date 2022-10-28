import { useEffect } from "react";
import UnderDevelopemnt from "../../components/UnderDevelopment";

const ReviewListPage = () => {
  useEffect(() => {
    document.title = "Reivews - Movie Rating";
  }, []);

  return <UnderDevelopemnt title="Reviews (Under Development)" />;
};

export default ReviewListPage;
