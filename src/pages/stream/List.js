import { useEffect } from "react";
import UnderDevelopemnt from "../../components/UnderDevelopment";

const StreamListPage = () => {
  useEffect(() => {
    document.title = "Stream Platform - Movie Rating";
  }, []);
  return <UnderDevelopemnt title="Stream Platform (Under Development)" />;
};

export default StreamListPage;
