import { client } from "./client";
import {STORAGE_KEY} from './constants';
import REFRESH_LOGIN from "./../../graphql/mutations/refresh"

export const parseJWT = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const refreshAuthToken = async () => {
  const token = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  if (!token) return;
  try {
    const response = await client
      .mutation(REFRESH_LOGIN, {
        request: {
          refreshToken: token.refreshToken,
        },
      })
      .toPromise();

    if (!response.data) return;

    const { accessToken, refreshToken } = response.data.refresh;
    const exp = parseJWT(refreshToken).exp;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        accessToken,
        refreshToken,
        exp,
      })
    );

    return {
      accessToken,
    };
  } catch (err) {
    console.log("error:", err);
  }
};