import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useManager = () => {
  const [isManager, setIsManager] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsManager(pathname.includes("/manager/"));
  }, [pathname]);
  return isManager;
};
