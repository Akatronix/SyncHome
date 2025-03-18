import { useState } from "react";
import logo from "../assets/logo.jpg";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [myFormData, setMyFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginRequest = async (e) => {
    e.preventDefault();
    const { email, password } = myFormData;
    if (!email || !password) return toast("All fields are required !");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(myFormData),
        }
      );

      if (!response.ok) {
        toast("Login Failed!");

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);

        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setMyFormData({ email: "", password: "" });
      const data = await response.json();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      toast("Login Successfully...");
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Error logging-in:", error);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      toast("Something Went Wrong!, While Loggin-In");
      return null;
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="px-4 md:px-0">
        <div className="w-full flex items-center justify-start gap-2.5">
          <img
            src={logo}
            alt="company logo"
            className="md:w-[50px] md:h-[50px] w-[36px] h-[36px] rounded-md"
          />
          <h1 className="md:text-3xl font-bold text-lg text-white">Login</h1>
        </div>
        <h1 className="md:text-md font-normal text-base text-gray-400 mb-4 text-nowrap">
          SyncHome the Smart Home Automation
        </h1>
        <form onSubmit={handleLoginRequest}>
          <div>
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <br />
            <input
              value={myFormData.email}
              required
              onChange={(e) =>
                setMyFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
              placeholder="xyz@emaple.com"
              id="email"
              className="
              md:w-[400px] text-white w-full py-3 px-6 border-2 border-zinc-400 outline-none rounded-md my-3"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <br />
            <input
              required
              value={myFormData.password}
              onChange={(e) =>
                setMyFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              type="password"
              id="password"
              className="
              md:w-[400px] text-white w-full py-3 px-6 border-2 border-zinc-400 outline-none rounded-md my-3"
            />
          </div>
          <button
            type="submit"
            className="md:w-[400px] w-full py-3 px-6 border-none  outline-none rounded-md my-3 bg-[#44821b] hover:bg-lime-600 hover:cursor-pointer text-white"
          >
            {isLoading ? (
              <>
                <svg
                  className="mr-3 size-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  />
                </svg>
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
