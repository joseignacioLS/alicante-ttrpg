export enum ERequestMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface IDefaultServerResponse {
  status: number;
  message?: string;
  data?: any;
}

export const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3500/"
    : process.env.NEXT_PUBLIC_API_URL;

export const makeRequest = async (
  url: string,
  {
    method,
    headers,
    body,
  }: {
    method: ERequestMethods;
    headers?: any;
    body?: any;
  } = { method: ERequestMethods.GET, body: {}, headers: {} }
): Promise<IDefaultServerResponse> => {
  let res = undefined;
  if (method === ERequestMethods.GET) {
    res = await fetch(url, {
      method,
      headers: {
        ...headers,
      },
    });
  } else {
    res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });
  }
  if (!res?.ok)
    return {
      status: 500,
      message: "unknown error",
    };
  const data = await res.json();
  return data;
};
