import { Link, NavLink } from "react-router";
import smartDealsLogo from "../../assets/smart_deals_logo.png";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import MyContainer from "../MyContainer";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.info("Sign-out successful.");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-products">All Products</NavLink>
      </li>
      {user && (
        <>
          <li>
            {" "}
            <NavLink to="/myProducts">My Products</NavLink>{" "}
          </li>
          <li>
            {" "}
            <NavLink to="/myBids">My Bids</NavLink>{" "}
          </li>
          <li>
            {" "}
            <NavLink to="/createProduct">Create Product</NavLink>{" "}
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="bg-base-100 shadow-sm">
      <MyContainer className={`navbar`}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            <img src={smartDealsLogo} alt="Smart Deals Logo" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 h-10 rounded-full ring ring-purple-500 ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      user?.photoURL ||
                      user?.photo ||
                      "https://via.placeholder.com/150"
                    }
                    alt={user?.displayName || user?.name || "User"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-lg"
              >
                <li className="menu-title">
                  <span className="text-[#001931] font-semibold">
                    {user?.displayName || user?.name || "User"}
                  </span>
                  <span className="text-xs text-gray-500">{user?.email}</span>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="text-red-600 hover:bg-red-50 gap-4"
                  >
                    <IoIosLogOut size={20} />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="btn bg-linear-to-br px-2 py-1.5 font-semibold leading-5 hidden sm:flex"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn bg-linear-to-br from-[#632ee3] to-[#9f62f2] text-white px-2 py-1.5 font-semibold leading-5"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </MyContainer>
    </div>
  );
};

export default Navbar;
