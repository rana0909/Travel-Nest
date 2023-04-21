import { useNavigate } from "react-router-dom";
import { Listing } from "../store/ListingsContext";

interface Props {
  data: Listing;
}

const Card: React.FC<Props> = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate("listing/" + data._id);
      }}
      className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg"
    >
      <img
        src={data?.images?.pictureUrl}
        alt="property"
        className="w-full max-w-sm h-60"
      />
      <div className="px-4 py-2">
        <div className="py-4 align-middle flex justify-between">
          <span className="font-semibold  text-md">{data.name}</span>
          <div className="flex">
            <span className=" flex align-middle font-medium mx-2">
              {data?.rating.toFixed(1)}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="28"
              viewBox="0 0 24 24"
              className="ml-[-16px]"
            >
              <path
                fill="#FFD700"
                d="M12,16.6L7.1,19.8l1.4-5.4L3.4,9.8l5.9-0.5L12,4.5l2.7,5.8l5.9,0.5l-4.1,3.6l1.4,5.4L12,16.6z"
              />
            </svg>
          </div>
        </div>
        <div className=" text-xs mb-2 max-h-5">
          {data.description?.split(" ").slice(0, 10).join(" ")}
        </div>
      </div>
    </button>
  );
};

export default Card;
