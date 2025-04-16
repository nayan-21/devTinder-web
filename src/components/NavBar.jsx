import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-[#1f1d36] text-pink-100 shadow-lg sticky top-0 z-50 px-4">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-2xl font-bold text-rose-500 hover:text-rose-400 transition-colors duration-300"
        >
          devTinder
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <p className="hidden sm:block text-sm font-medium text-rose-300">
            Welcome, <span className="text-rose-400">{user.firstName}</span>
          </p>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ring ring-rose-500 ring-offset-[#1f1d36] ring-offset-2 hover:scale-105 transition-transform"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src={user.profileUrl}
                  className="object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-[#2a1a2e] rounded-box w-52 text-pink-100"
            >
              <li>
                <Link to="/profile" className="hover:text-rose-300 transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="hover:text-rose-300 transition-colors">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="hover:text-rose-300 transition-colors">
                  Requests
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-error hover:text-rose-500 transition-colors"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
