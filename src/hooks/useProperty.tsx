import { userContext } from "@/context/userContext";
import { useContext } from "react";

const useProperty = (nameQuery: string) => {
  const { name } = useContext(userContext);
  return name === nameQuery;
};

export default useProperty;
