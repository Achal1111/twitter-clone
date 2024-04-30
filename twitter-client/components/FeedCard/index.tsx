import Image from "next/image";
import FeedOptions from "../FeedOptions";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard = ({ data }: FeedCardProps) => {
  return (
    <div className="border border-gray-600 border-r-0 border-l-0 border-b-0 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          {data?.author?.profileImageURL && (
            <Image
              className="rounded-full"
              src={data?.author?.profileImageURL}
              alt="user-image"
              height={50}
              width={50}
            />
          )}
        </div>
        <div className="col-span-11">
          <h5>
            <Link href={`/${data?.author?.id}`}>
              {data?.author?.firstName} {data?.author?.lastName}
            </Link>
          </h5>
          <p>{data?.content}</p>
          {data?.imageURL && (
            <Image src={data?.imageURL} alt="image" height={400} width={400} />
          )}

          <div className="pr-10 w-[90%] mt-2">
            <FeedOptions />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeedCard;
