import { FaRegHeart, FaRetweet } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { IoCloudUploadOutline } from "react-icons/io5";

const FeedOptions = () => {
  return (
    <div className="flex justify-between text-xl">
      <FiMessageCircle />
      <FaRetweet />
      <FaRegHeart />
      <IoCloudUploadOutline />
    </div>
  );
};
export default FeedOptions;
