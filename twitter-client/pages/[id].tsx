import { graphQlClient } from "@/clients/api";
import FeedCard from "@/components/FeedCard";
import TwitterLayout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import { Tweet, User } from "@/gql/graphql";
import {
  followUserMutation,
  unfollowUserMutation,
} from "@/graphql/mutation/user";
import { getUserByIdQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useCallback, useMemo } from "react";

interface ServerProps {
  userInfo?: User;
}
const UserProfilePage: NextPage<ServerProps> = (props) => {
  const { user: currentUser } = useCurrentUser();

  const queryClient = useQueryClient();

  const amIFollowing = useMemo(() => {
    if (!currentUser) return false;
    return (
      (currentUser?.following?.findIndex(
        (user) => user?.id === props?.userInfo?.id
      ) ?? -1) >= 0
    );
  }, [currentUser?.following, props?.userInfo]);

  const handleFollowUser = useCallback(async () => {
    if (!props?.userInfo?.id) return;
    await graphQlClient.request(followUserMutation, {
      to: props?.userInfo?.id,
    });
    await queryClient.invalidateQueries({ queryKey: ["curent-user"] });
  }, [props?.userInfo?.id, queryClient]);

  const handleUnFollowUser = useCallback(async () => {
    if (!props?.userInfo?.id) return;
    await graphQlClient.request(unfollowUserMutation, {
      to: props?.userInfo?.id,
    });
    await queryClient.invalidateQueries({ queryKey: ["curent-user"] });
  }, [props?.userInfo?.id, queryClient]);

  return (
    <div>
      <TwitterLayout>
        <div>
          <Navbar
            userName={props?.userInfo?.firstName || ""}
            tweetsCount={props?.userInfo?.tweets?.length || 0}
          />
          <div className="p-4 border-b border-slate-800">
            {props?.userInfo?.profileImageURL && (
              <Image
                src={props?.userInfo?.profileImageURL}
                alt="user-image"
                className="rounded-full"
                width={100}
                height={100}
              />
            )}
            <h1 className="text-2xl font-bold mt-5">
              {props?.userInfo?.firstName} {props?.userInfo?.lastName}
            </h1>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 mt-2 text-sm text-gray-400">
                <span>{props?.userInfo?.followers?.length} Followers</span>
                <span>{props?.userInfo?.following?.length} Following</span>
              </div>
              {currentUser?.id !== props?.userInfo?.id && (
                <>
                  {amIFollowing ? (
                    <button
                      onClick={handleUnFollowUser}
                      className="bg-white px-3 py-1 text-black rounded-full text-sm"
                    >
                      UnFollow
                    </button>
                  ) : (
                    <button
                      onClick={handleFollowUser}
                      className="bg-white px-3 py-1 text-black rounded-full text-sm"
                    >
                      Follow
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <div>
            {props?.userInfo?.tweets?.map((tweet) => (
              <FeedCard data={tweet as Tweet} key={tweet?.id} />
            ))}
          </div>
        </div>
      </TwitterLayout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context
) => {
  const id = context.query.id as string | undefined;
  if (!id) return { notFound: true, props: { userInfo: undefined } };
  const userInfo = await graphQlClient.request(getUserByIdQuery, { id });
  if (!userInfo.getUserByID) return { notFound: true };
  return {
    props: {
      userInfo: userInfo?.getUserByID as User,
    },
  };
};

export default UserProfilePage;
