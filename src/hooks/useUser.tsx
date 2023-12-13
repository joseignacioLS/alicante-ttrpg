import { userContext } from "@/context/userContext";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const useUser = (protectedRoute: boolean = false) => {
  const { admin } = useContext(userContext);
  const router = useRouter();

  const [isManager, setIsManager] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsManager(pathname?.includes("/manager/") || false);
  }, [pathname]);

  useEffect(() => {
    if (admin === false && protectedRoute) router.push("/");
  }, [admin]);

  return { isAdmin: admin, isManager };
};

export default useUser;
