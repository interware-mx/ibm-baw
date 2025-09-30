import axios from "axios";

import type {
  Method,
  ResponseType,
  AxiosHeaderValue,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosBasicCredentials
} from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  responseType: "json",
});

// Do not throw errors on 'bad' server response codes
api.interceptors.response.use(
  (axiosConfig) => axiosConfig,
  async (error) => {
    const { status, data } = error.response;

    if (status === 401) {
      /**
       * SignOut
       */
      console.error("🚨 ~ status:", status);
    }

    console.error("API: Error Ocurred", status, data);
    throw error.response;
  },
);

const ClientHttpRequest =
  <D = unknown>(method: Method) =>
    async ({
      baseURL,
      url,
      data,
      responseType,
      headers,
      auth
    }: {
      baseURL?: string;
      url: string;
      data?: D;
      responseType?: ResponseType;
      headers?: Record<string, AxiosHeaderValue>;
      auth?: AxiosBasicCredentials
    }) => {
      let urlWithSlash = url || "";

      if (urlWithSlash[0] !== "/") {
        urlWithSlash = `/${urlWithSlash}`;
      }

      let https

      if (typeof window === "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const httpsImport = require("node:https");

        https = httpsImport
      }

      const options: AxiosRequestConfig = {
        method,
        url: urlWithSlash,
        httpsAgent: typeof window === "undefined" ? new https.Agent({
          rejectUnauthorized: false
        }) : undefined
      };

      if (baseURL) {
        options.baseURL = baseURL
      }

      if (responseType) {
        options.responseType = responseType;
      }

      if (headers) {
        options.headers = { ...headers };
      }

      if (auth) {
        options.auth = auth
      }

      if (data) {
        if (method === "GET" || method === "PUT") {
          options.params = data;
        } else {
          options.data = data;
        }
      }

      const response: AxiosResponse = await api(options);

      if (response.status >= 200 && response.status < 300) {
        return response;
      }

      return response;
    };

export const GetRequest = ClientHttpRequest("GET");
export const PostRequest = ClientHttpRequest("POST");
export const PutRequest = ClientHttpRequest("PUT");
export const PatchRequest = ClientHttpRequest("PATCH");
export const DeleteRequest = ClientHttpRequest("DELETE");

const APIClient = {
  get: GetRequest,
  post: PostRequest,
  put: PutRequest,
  delete: DeleteRequest,
};

export default APIClient;
