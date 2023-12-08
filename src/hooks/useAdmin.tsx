import { userContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export const useAdmin = () => {
  const { admin } = useContext(userContext);
  const router = useRouter();

  useEffect(() => {
    if (!admin) router.push("/");
  }, [admin]);
};
