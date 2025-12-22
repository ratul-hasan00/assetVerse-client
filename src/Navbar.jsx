import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import LogoImage from "./assets/assetverse_logo.png";
import { AuthContext } from "./Context/AuthContext";

const Navbar = () => {
  const { user, role, logOut, loading } = useContext(AuthContext);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  if (loading) return null;

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition
    ${
      isActive
        ? "bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 text-white"
        : "text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:via-orange-400 hover:to-pink-500"
    }`;

  const employeeLinks = [
    { name: "My Assets", to: "/dashboard/my-assets" },
    { name: "Request Asset", to: "/dashboard/request-asset" },
    { name: "My Team", to: "/dashboard/my-team" },
    { name: "Profile", to: "/dashboard/employeeProfile" },
  ];

  const hrLinks = [
    { name: "Asset List", to: "/dashboard/asset" },
    { name: "Add Asset", to: "/dashboard/add-asset" },
    { name: "All Requests", to: "/dashboard/Allrequests" },
    { name: "Employee List", to: "/dashboard/employees" },
    { name: "Upgrade Package", to: "/dashboard/upgrade" },
    { name: "Profile", to: "/dashboard/HRprofile" },
  ];

  const roleLinks =
    role === "employee" ? employeeLinks : role === "hr" ? hrLinks : [];

  const handleLogout = async () => {
    await logOut();
    toast.success("Logged out successfully!");
    setMobileOpen(false);
    setDashboardOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={LogoImage} alt="AssetVerse" className="w-10 h-10 rounded-xl" />
          <span className="hidden sm:block text-xl font-bold text-slate-800">
            AssetVerse
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-3">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>

          {!user && (
            <>
              <NavLink to="/join-employee" className={navLinkClass}>
                Join as Employee
              </NavLink>
              <NavLink to="/join-hr" className={navLinkClass}>
                Join as HR Manager
              </NavLink>
              <NavLink
                to="/login"
                className="ml-2 px-6 py-2 rounded-lg text-white bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500"
              >
                Login
              </NavLink>
            </>
          )}

          {user && (
            <div className="relative">
              <button
                onClick={() => setDashboardOpen(!dashboardOpen)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:via-orange-400 hover:to-pink-500"
              >
                Dashboard
              </button>

              {dashboardOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg">
                  <ul className="p-2 space-y-1">
                    {roleLinks.map(link => (
                      <li key={link.to}>
                        <NavLink
                          to={link.to}
                          className={navLinkClass}
                          onClick={() => setDashboardOpen(false)}
                        >
                          {link.name}
                        </NavLink>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 rounded-lg text-sm text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:via-orange-400 hover:to-pink-500"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden btn btn-ghost btn-circle text-xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 py-3 space-y-2">
          <NavLink to="/" className={navLinkClass} onClick={() => setMobileOpen(false)}>
            Home
          </NavLink>

          {!user && (
            <>
              <NavLink to="/join-employee" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                Join as Employee
              </NavLink>
              <NavLink to="/join-hr" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                Join as HR Manager
              </NavLink>
              <NavLink to="/login" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                Login
              </NavLink>
            </>
          )}

          {user && (
            <>
              {roleLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={navLinkClass}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-lg text-sm text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:via-orange-400 hover:to-pink-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
