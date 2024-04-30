import { graphQlClient } from "@/clients/api";
import CreatePostCard from "@/components/CreatPostCard";
import FeedCard from "@/components/FeedCard";
import TwitterLayout from "@/components/Layout";
import { Tweet } from "@/gql/graphql";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { useGetAllTweets } from "@/hooks/tweet";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";

interface HomeProps {
  tweets?: Tweet[];
}

export default function Home(props: HomeProps) {
  const { tweets = props.tweets as Tweet[] } = useGetAllTweets();
  return (
    <div>
      <TwitterLayout>
        <CreatePostCard />
        {tweets?.map((tweet) =>
          tweet ? <FeedCard key={tweet.id} data={tweet as Tweet} /> : null
        )}
      </TwitterLayout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const allTweets = await graphQlClient.request(getAllTweetsQuery);
  return {
    props: {
      tweets: allTweets?.getAllTweets as Tweet[],
    },
  };
};
