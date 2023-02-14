import axiosClient, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthService } from "./AuthService";
import { LocalStorageService } from "./LocalStorageService";

export interface ApiResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: string;
}

export function authHeader(): Record<string, string> {
  const accessToken = AuthService.getCredentials().accessToken;

  if (accessToken) {
    return { Authorization: "Bearer " + accessToken };
  } else {
    return {};
  }
}

const instance = axiosClient.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});

const apiHost = process.env.REACT_APP_API_ENDPOINT;

instance.interceptors.response.use(
  (response) => {
    const transformedResponse: AxiosResponse<ApiResponse> = {
      data: { ok: response.data.ok },
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config: response.config,
    };

    const error = response.data.error;
    const data = response.data.data;

    if (error) {
      transformedResponse.data.error = error;
    }

    if (data) {
      transformedResponse.data = data;
    }

    return transformedResponse;
  },
  (error) => {
    let errorCode = "something-went-wrong";

    if (!error.response && error.message === "Network Error") {
      errorCode = "network-error";
    }

    if (error.response && error.response.status === 401) {
      AuthService.clearCredentials();
      LocalStorageService.setItem("walletAddress", null);
      if (window.location.pathname !== "/auth") {
        window.location.href = "/auth";
      }
    }

    return {
      ok: false,
      data: null,
      error: errorCode,
    };
  }
);

const axios = <T>(cfg: AxiosRequestConfig) => instance.request<any, T>(cfg);

export const ApiService = {
  get: <T>({
    endpoint,
    params,
  }: {
    endpoint: string;
    params?: Record<string, any>;
  }): Promise<ApiResponse<T>> => {
    const response = axios<ApiResponse<T>>({
      method: "GET",
      url: `${apiHost}${endpoint}`,
      headers: { ...authHeader() },
      params,
    });

    response.catch((error) => {
      console.log("catch", error);
    });

    return response;
  },
  post: <T>({
    endpoint,
    data,
  }: {
    endpoint: string;
    data: T;
  }): Promise<ApiResponse<T>> => {
    const response = axios<ApiResponse<T>>({
      method: "POST",
      url: `${apiHost}${endpoint}`,
      headers: { ...authHeader() },
      data: {
        ...data,
      },
    });

    response.catch((error) => {
      console.log("catch", error);
    });

    return response;
  },

  delete: <T>({ endpoint }: { endpoint: string }): Promise<ApiResponse<T>> => {
    const response = axios<ApiResponse<T>>({
      method: "DELETE",
      url: `${apiHost}${endpoint}`,
      headers: { ...authHeader() },
    });

    response.catch((error) => {
      console.log("catch", error);
    });

    return response;
  },
};
