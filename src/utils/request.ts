export enum ERequestMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

export const makeRequest = async (url: string, { method, headers, body }: {
  method: ERequestMethods,
  headers?: any,
  body?: any
} = { method: ERequestMethods.GET }) => {
  let res = undefined;
  if (method === ERequestMethods.GET) {
    res = await fetch(url, {
      method,
      headers: {
        ...headers
      },
    });
  }
  else {

    res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: JSON.stringify({ ...body, apiToken: process.env.NEXT_PUBLIC_API_TOKEN })
    });
  }
  if (!res?.ok) return {
    status: 500,
    message: "unknown error"
  }
  const data = await res.json()
  return data
}

