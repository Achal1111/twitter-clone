import React, { useCallback } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphQlClient } from "@/clients/api";
import { useQueryClient } from "@tanstack/react-query";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";

const GoogleLoginButton = () => {
  const queryClient = useQueryClient();
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error("Google token not found");
      const { verifyGoogleToken } = await graphQlClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        }
      );

      toast.success("Verified Successfully");
      if (verifyGoogleToken)
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);
      await queryClient.invalidateQueries({ queryKey: ["curent-user"] });
    },
    [queryClient]
  );
  return (
    <div className="p-5 bg-slate-700 rounded-lg w-fit">
      <h1 className="mb-2">New to Twitter?</h1>
      <GoogleLogin onSuccess={handleLoginWithGoogle} />
    </div>
  );
};

export default GoogleLoginButton;
