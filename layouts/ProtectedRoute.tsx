import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (loading) return;
    if (user) return;
    router.push("/login");
  }, [user, loading]);
  if (loading) return <div>Loading...</div>;
  if (user) return <div>{children}</div>;
  return <div>Redirecting...</div>;
}
