import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { toast } from "react-hot-toast";
import LogoImage from "./assets/assetverse_logo.png";
import { AuthContext } from "./Context/AuthContext";

const Navbar = () => {
    const { user, role, logOut, loading } = useContext(AuthContext);

    if (loading) return null;

    const navLinkClass = ({ isActive }) =>
        `px-4 py-2 rounded-lg text-sm font-medium transition
    ${isActive
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
        { name: "Profile", to: "/dashboard/HRprofile" },
    ];

    const roleLinks = role === "employee" ? employeeLinks : role === "hr" ? hrLinks : [];

    // Handle logout with toast
    const handleLogout = async () => {
        await logOut();
        toast.success("Logged out successfully!");
    };

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto px-4 flex items-center h-16 relative">

                {/* LEFT: Logo */}
                <div className="flex items-center gap-2 z-10">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={LogoImage} alt="AssetVerse Logo" className="w-10 h-10 rounded-xl" />
                        <span className="hidden sm:block text-xl font-bold text-slate-800">AssetVerse</span>
                    </Link>
                </div>

                {/* CENTER: Desktop Links */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
                    <ul className="menu menu-horizontal gap-2 items-center">
                        <li>
                            <NavLink to="/" className={navLinkClass}>Home</NavLink>
                        </li>

                        {!user && (
                            <>
                                <li>
                                    <NavLink to="/join-employee" className={navLinkClass}>Join as Employee</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/join-hr" className={navLinkClass}>Join as HR Manager</NavLink>
                                </li>
                            </>
                        )}

                        {user && (
                            <li className="dropdown">
                                <label tabIndex={0} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 cursor-pointer hover:text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:via-orange-400 hover:to-pink-500">
                                    Dashboard
                                </label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box mt-2 w-52">
                                    {roleLinks.map(link => (
                                        <li key={link.to}>
                                            <NavLink to={link.to} className={navLinkClass}>{link.name}</NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>

                {/* RIGHT: Desktop Login / Logout */}
                <div className="hidden lg:flex ml-auto z-10">
                    {!user ? (
                        <NavLink
                            to="/login"
                            className="btn text-white border-none bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500"
                        >
                            Login
                        </NavLink>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="btn text-white border-none bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500"
                        >
                            Logout
                        </button>
                    )}
                </div>

                {/* MOBILE: Hamburger + Dropdown */}
                <div className="flex lg:hidden items-center justify-between w-full">
                    {/* Hamburger icon */}
                    <div className="dropdown z-10">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow bg-white rounded-xl w-56">
                            <li>
                                <NavLink to="/" className={navLinkClass}>Home</NavLink>
                            </li>

                            {!user && (
                                <>
                                    <li>
                                        <NavLink to="/join-employee" className={navLinkClass}>Join as Employee</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/join-hr" className={navLinkClass}>Join as HR Manager</NavLink>
                                    </li>
                                </>
                            )}

                            {user && (
                                <>
                                    <li className="dropdown">
                                        <label tabIndex={0} className="cursor-pointer px-4 py-2 rounded-lg text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:via-orange-400 hover:to-pink-500">
                                            Dashboard
                                        </label>
                                        <ul className="menu p-2">
                                            {roleLinks.map(link => (
                                                <li key={link.to}>
                                                    <NavLink to={link.to} className={navLinkClass}>{link.name}</NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Mobile Login/Logout */}
                    <div className="ml-auto z-10">
                        {!user ? (
                            <NavLink
                                to="/login"
                                className="btn btn-sm text-white border-none bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500"
                            >
                                Login
                            </NavLink>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="btn btn-sm text-white border-none bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Navbar;
