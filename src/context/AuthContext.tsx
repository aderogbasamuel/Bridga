import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    console.log("🔹 Auth state changed:", firebaseUser);

    if (firebaseUser) {
      setUser(firebaseUser);

      try {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        console.log("🔹 User doc:", userDoc.exists(), userDoc.data());

        if (userDoc.exists()) {
          setRole(userDoc.data().role || "user");
        } else {
          setRole("user");
        }
      } catch (err) {
        console.error("❌ Error fetching user doc:", err);
        setRole("user");
      }
    } else {
      setUser(null);
      setRole(null);
    }

    setLoading(false);
  });

  return () => unsubscribe();
}, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {loading ? (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black"></div>
      </div>
    ) : (
      children
    )}
    </AuthContext.Provider>
  );
};
