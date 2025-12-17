import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import MyContainer from "../MyContainer";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Register = () => {
  const [show, setShow] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user, setUser, createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from);
      return;
    }
  }, [user, navigate, from]);

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must contain at least one special character (!@#$%^&*).";
    }
    return "";
  };

  const handleRegister = (event) => {
    event.preventDefault();
    setPasswordError("");

    const form = event.target;
    const email = form.email.value.trim();
    const pass = form.password.value.trim();
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();

    // validation
    const passErr = validatePassword(pass);
    if (passErr) {
      setPasswordError(passErr);
      return;
    }

    setSubmitting(true);

    // create user in Firebase auth
    createUser(email, pass).then((result) => {
      const loggedUser = result.user;
      // console.log(loggedUser);

      // update Firebase profile
      updateUserProfile(name, photo)
        .then(() => {
          // Update local state immediately so Navbar shows name/photo
          setUser({ ...loggedUser, displayName: name, photoURL: photo });

          const newUser = {
            name,
            email,
            photo,
            createdAt: new Date(),
          };

          fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((res) => res.json())
            .then((data) => {
              // console.log("User saved to database:", data);
              toast.success("Signup successful!");
              setSubmitting(false);
              form.reset();
            }).catch((dbError) => {
              console.error("Database save error:", dbError);
              setSubmitting(false);
            });
        })
        .catch((profileError) => {
          console.error("Profile update error:", profileError);
          setSubmitting(false);
        });
        })
        .catch((error) => {
          console.error("Signup error:", error);

          if (error.code === "auth/email-already-in-use") {
            toast.error(
              "This email is already registered. Please login instead."
            );
          } else if (error.code === "auth/invalid-email") {
            toast.error("Invalid email address. Please enter a valid email.");
          } else if (error.code === "auth/operation-not-allowed") {
            toast.error(
              "Email/password accounts are not enabled. Contact support."
            );
          } else if (error.code === "auth/weak-password") {
            toast.error(
              "Password is too weak. Please use at least 6 characters."
            );
          } else {
            toast.error(error.message || "Signup failed. Please try again.");
          }
          setSubmitting(false);
        });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        // console.log(result.user);
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          createdAt: new Date(),
        };

        // create user in the database
        fetch(`${import.meta.env.VITE_API_URL}/users`, {
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
      <title>Sign Up</title>
      <MyContainer>
        <div className="min-h-screen flex items-center justify-center">
          <div className="card w-full max-w-sm shadow-2xl bg-white p-6 border border-gray-200">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                Register Now!
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="link link-hover text-purple-600 font-medium"
                >
                  Login Now
                </Link>
              </p>
            </div>

            <form onSubmit={handleRegister} noValidate>
              {/* Name Field */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-sm text-[#001931] font-medium">
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Mariam Swarna"
                  className="input input-bordered w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

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

              {/* Image-URL Field */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-sm text-[#001931] font-medium">
                    Image-URL
                  </span>
                </label>
                <input
                  type="url"
                  name="photo"
                  placeholder="smsowkotthesan@gmail.com"
                  className="input input-bordered w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="********"
                    className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2  -translate-y-1/2 text-gray-700 hover:text-gray-950 transition"
                    aria-label={show ? "Hide password" : "Show password"}
                  >
                    {show ? <IoEye /> : <IoEyeOff />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-600 mt-2.5"> {passwordError} </p>
                )}
              </div>

              {/* Register Button (Primary Purple) */}
              <div className="form-control">
                <button
                  type="submit"
                  className="w-full btn bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-white px-4 py-3 font-semibold leading-5 hover:bg-purple-700 border-none p-3 rounded-md text-lg shadow-lg transition duration-150 ease-in-out"
                >
                  {submitting ? "Registering..." : "Register"}
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

export default Register;
