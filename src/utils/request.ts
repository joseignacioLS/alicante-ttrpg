export enum ERequestMethods {
  GET = "GET",
  POST = "POST"
}

export const makeRequest = async (url: string, options: {
  method: ERequestMethods,
  headers?: any,
  body?: string
} = { method: ERequestMethods.GET }) => {
  const res = await fetch(url, options);
  if (!res.ok) return {
    status: 500,
    message: "unknown error"
  }
  const data = await res.json()
  return data
}

