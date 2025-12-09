import React, { useContext, useEffect, useState } from "react";
import MyContainer from "../MyContainer";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login = () => {
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const { user, setUser, signInUser, setLoading, signInWithGoogle } =
    useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate(from);
      return;
    }
  }, [user, navigate, from]);

  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value.trim();
    const pass = form.password.value;

    if (!email || !pass) {
      toast.error("Please enter email and password");
      return;
    }

    setSubmitting(true);

    signInUser(email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        toast.success("Signin successful!");
        setSubmitting(false);
        event.target.reset();
      })
      .catch((error) => {
        console.log(`Login failed: ${error}`);
        let message = "Login failed. Please try again.";

        if (error.code === "auth/invalid-email") {
          message = "The email address is not valid.";
        } else if (error.code === "auth/user-disabled") {
          message = "This user account has been disabled.";
        } else if (error.code === "auth/user-not-found") {
          message = "No user found with this email.";
        } else if (error.code === "auth/wrong-password") {
          message = "Incorrect password. Please try again.";
        } else if (error.code === "auth/too-many-requests") {
          message = "Too many failed login attempts. Try again later.";
        } else if (error.code === "auth/cancelled-popup-request") {
          message = "Popup request was cancelled. Please try again.";
        } else if (error.code === "auth/invalid-credential") {
          message = "The credential is invalid or has expired.";
        } else if (error.message) {
          message = error.message;
        }

        toast.error(message);
        setSubmitting(false);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          createdAt: new Date(),
        };

        // create user in the database
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <title>Login</title>
      <MyContainer>
        <div className="min-h-screen flex items-center justify-center">
          <div className="card w-full max-w-sm shadow-2xl bg-white p-6 border border-gray-200">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Login</h1>
              <p className="mt-2 text-sm text-gray-500">
                Don't have an account?
                <Link
                  to="/register"
                  className="link link-hover text-purple-600 font-medium"
                >
                  Register Now
                </Link>
              </p>
            </div>

            <form onSubmit={handleLogin} noValidate>
              {/* Email Field */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-sm text-[#001931] font-medium">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="smsowkotthesan@gmail.com"
                  className="input input-bordered w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text text-sm text-[#001931] font-medium">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={show ? "text" : "password"}
                    required
                    className="block w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="New password"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-950 transition"
                    aria-label={show ? "Hide password" : "Show password"}
                  >
                    {" "}
                    {show ? <IoEye /> : <IoEyeOff />}{" "}
                  </button>
                </div>
              </div>

              {/* Register Button (Primary Purple) */}
              <div className="form-control">
                <button
                  type="submit"
                  className="w-full btn bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-white px-4 py-3 font-semibold leading-5 hover:bg-purple-700 border-none p-3 rounded-md text-lg shadow-lg transition duration-150 ease-in-out"
                >
                  {submitting ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>

            {/* OR separator */}
            <div className="divider text-[#001931] font-semibold leading-5 my-4">
              OR
            </div>

            {/* Google Sign Up Button */}
            <div className="form-control">
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="w-full btn bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 p-3 rounded-md text-base font-medium shadow-sm flex items-center justify-center transition duration-150 ease-in-out"
              >
                <svg
                  aria-label="Google logo"
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="mr-2"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Continue With Google
              </button>
            </div>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Login;
