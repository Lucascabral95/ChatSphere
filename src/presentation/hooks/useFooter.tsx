import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export const useFooter = () => {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const userEmail = session?.user?.email || null;

  const handleLogout = () => {
    signOut();
  };

  return {
    userEmail,
    isLoading,
    handleLogout,
  };
};
