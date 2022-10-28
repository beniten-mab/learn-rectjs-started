import axios from "./../../axios";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import Avatar from "react-avatar";
import Rating from "react-star-review";
import IsLoading from "../../components/IsLoading";

const ReviewListPage = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetechReviews = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/watch/reviews`);
      setReviews(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const titleCase = (s) => {
    return s
      .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
      .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase());
  };

  useEffect(() => {
    document.title = "Reviews List - Movie Rating";
    fetechReviews();
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Latest reviews</h3>
      </div>
      <div className="space-y-3">
        {isLoading ? (
          <IsLoading />
        ) : (
          reviews &&
          reviews.map((review, key) => (
            <div
              className="flex bg-white p-4 rounded shadow space-y-2 group"
              key={key}
            >
              <div className="flex gap-2">
                <div>
                  <Avatar name={review.review_user} size={45} round={true} />
                </div>
                <div className="space-y-2">
                  <div className="flex gap-1 items-center">
                    <h3 className="text-2xl font-bold">
                      {titleCase(review.review_user)}
                    </h3>
                    <span>—</span>
                    <Rating rating={review.rating} />
                  </div>
                  <p className="text-gray-800">{review.description}</p>
                  <div className="flex gap-1 text-gray-500 text-sm">
                    <p>Reviewed at</p>
                    <Moment format="DD/MM/YYYY hh:mm:ss A">
                      {review.created}
                    </Moment>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewListPage;
