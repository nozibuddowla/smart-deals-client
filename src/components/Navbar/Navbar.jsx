import { Link, NavLink } from "react-router";
import smartDealsLogo from "../../assets/smart_deals_logo.png";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import MyContainer from "../MyContainer";

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
            <img src={smartDealsLogo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button
              onClick={handleSignOut}
              className="btn btn-outline btn-error btn-sm"
            >
              Logout
            </button>
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
