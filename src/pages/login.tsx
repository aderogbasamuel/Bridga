import { Icon } from "@iconify/react";
import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [identifier, setIdentifier] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    // 🔑 now returns user directly
    const user = await loginUser(identifier, password);

    // fetch role from Firestore
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    const role = snap.exists() ? snap.data().role : "user";

    // redirect
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};



  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" border-gray-300 border-1 flex w-full max-w-[650px] flex-col sm:flex-row">
        <div className="bg-black text-white p-8 flex flex-col w-full sm:w-[40%]">
          <h2 className="font-bold text-[26px]">Login</h2>
          <p className="text-[14px] mt-3">
            Get access to your Orders, Wishlist and Recommendations.
          </p>
        </div>

        <div className="flex p-8 py-10 bg-white flex-col gap-4 w-full sm:w-[60%]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter Username/Email address"
              className="border-1 p-2 text-[12px] border-gray-300 text-gray-500 "
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
            <div className="flex border-1 border-gray-300 items-center gap-2 pe-2">
              <input
                type={isVisible ? "text" : "password"}
                placeholder="Enter Password"
                              className="w-full p-2 text-[12px] text-gray-500 "
                              value={password}
          onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon icon="lucide:eye-off" width="20" height="20" />
                ) : (
                  <Icon icon="lucide:eye" width="20" height="20" />
                )}
              </button>{" "}
            </div>
            <div className="flex justify-between text-black text-[14px] font-semibold items-center">
              <div className="flex gap-2 items-center">
                <input type="checkbox" name="remember" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="">
                Lost your password?
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white py-2 text-[14px] font-semibold uppercase"
            >
              {loading ? "Loging in..." : "Log in"}
            </button>
            {error && <p className="text-red-500">{error}</p>}
            
                  </form>
                  <button onClick={()=>navigate("/signup")} className="bg-white border border-gray-300 text-black py-2 text-[14px] font-semibold uppercase">
              New to Bridga? Signin
            </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
