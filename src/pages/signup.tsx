import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
const Signup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible((prevState) => !prevState);
      };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(username, email, password);
      navigate("/"); // redirect after signup
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

    return (
        <>
            {/* <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create Account</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
            </div> */}
            <div className="flex items-center justify-center h-screen">
                  <div className=" border-gray-300 border-1 flex w-full max-w-[650px] flex-col sm:flex-row">
                    <div className="bg-black text-white p-8 flex flex-col w-full sm:w-[40%]">
                      <h2 className="font-bold text-[26px]">Signup</h2>
                      <p className="text-[14px] mt-3">
                        Join Bridga to manage your projects, collaborate with your team, and unlock exclusive features.
                      </p>
                    </div>
            
                    <div className="flex p-8 py-10 bg-white flex-col gap-4 w-full sm:w-[60%]">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                          type="text"
                          placeholder="Enter Username"
                          className="border-1 p-2 text-[12px] border-gray-300 text-gray-500 "
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Email address"
                          className="border-1 p-2 text-[12px] border-gray-300 text-gray-500 "
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                          <button onClick={toggleVisibility} type="button">
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
                          {loading ? "Signing up..." : "Sign Up"}
                        </button>
                        {error && <p className="text-red-500">{error}</p>}
                        
                              </form>
                              <button onClick={()=>navigate("/login")} className="bg-white border border-gray-300 text-black py-2 text-[14px] font-semibold uppercase">
                          Have an Account? Login
                        </button>
                    </div>
                  </div>
                </div>
        </>

  );
};

export default Signup;
