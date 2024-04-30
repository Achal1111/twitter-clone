import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";
import { FaRegImages } from "react-icons/fa";
import { useCreateTweet } from "@/hooks/tweet";
import { graphQlClient } from "@/clients/api";
import { getSignedURLForTweetQuery } from "@/graphql/query/tweet";
import axios from "axios";
import toast from "react-hot-toast";

const CreatePostCard = () => {
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const { mutateAsync } = useCreateTweet();

  const handleInputFileChange = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input?.files?.item(0);
      if (!file) return;
      const { getSignedURLForTweet } = await graphQlClient.request(
        getSignedURLForTweetQuery,
        {
          imageName: file.name,
          imageType: file.type,
        }
      );
      if (getSignedURLForTweet) {
        toast.loading("Uploading...", { id: "2" });
        await axios.put(getSignedURLForTweet, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        toast.success("Upload Completed!!", { id: "2" });
        const url = new URL(getSignedURLForTweet);
        const filePath = `${url.origin}${url.pathname}`;
        setImageURL(filePath);
      }
      console.log(input.files);
    };
  }, []);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    const fileHandlerFn = handleInputFileChange(input);
    input.addEventListener("change", fileHandlerFn);
    input.click();
  }, [handleInputFileChange]);

  const { user } = useCurrentUser();

  const handleCreateTweet = useCallback(async () => {
    await mutateAsync({
      content,
      imageURL,
    });
    setContent("");
    setImageURL("");
  }, [content, mutateAsync, imageURL]);

  return (
    <div className="border border-gray-600 border-r-0 border-l-0 border-b-0 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          {user?.profileImageURL && (
            <Image
              className="rounded-full"
              src={user?.profileImageURL}
              alt="user-image"
              height={50}
              width={50}
            />
          )}
        </div>
        <div className="col-span-11">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-transparent text-xl px-3 border-b border-slate-700"
            rows={3}
            placeholder="What's happening?"
          ></textarea>
          {imageURL && (
            <Image
              src={imageURL}
              alt="twitter-image"
              width={300}
              height={300}
            />
          )}
          <div className="mt-2 flex justify-between items-center">
            <FaRegImages onClick={handleSelectImage} className="text-xl" />
            <button
              onClick={handleCreateTweet}
              className="bg-[#1d9bf0] text-white text-sm font-semibold rounded-full p-2"
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostCard;
