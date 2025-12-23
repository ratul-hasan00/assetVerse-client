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
        { name: "Request Assets", to: "/dashboard/request-asset" },
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

    const roleLinks = role === "employee" ? employeeLinks : role === "hr" ? hrLinks : [];

    const handleLogout = async () => {
        await logOut();
        toast.success("Logged out successfully!");
    };

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* LEFT: LOGO */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={LogoImage} alt="AssetVerse Logo" className="w-10 h-10 rounded-xl" />
                    <span className="text-xl font-bold text-slate-800 hidden sm:block">
                        AssetVerse
                    </span>
                </Link>

                {/* CENTER: DESKTOP NAV */}
                <nav className="hidden lg:flex items-center gap-2">
                    <NavLink to="/" className={navLinkClass}>Home</NavLink>

                    {!user && (
                        <>
                            <NavLink to="/join-employee" className={navLinkClass}>
                                Join as Employee
                            </NavLink>
                            <NavLink to="/join-hr" className={navLinkClass}>
                                Join as HR Manager
                            </NavLink>
                        </>
                    )}

                    {user && (
                        <div className="dropdown dropdown-end">
                            <label
                                tabIndex={0}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 cursor-pointer hover:text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:via-orange-400 hover:to-pink-500"
                            >
                                Dashboard
                            </label>

                            <ul
                                tabIndex={0}
                                className="dropdown-content menu mt-2 p-2 shadow bg-white rounded-xl w-56"
                            >
                                {roleLinks.map(link => (
                                    <li key={link.to}>
                                        <NavLink to={link.to} className={navLinkClass}>
                                            {link.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </nav>

                {/* RIGHT: LOGIN / LOGOUT (DESKTOP) */}
                <div className="hidden lg:flex items-center gap-2">
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

                {/* MOBILE MENU */}
                <div className="lg:hidden">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>

                        <ul
                            tabIndex={0}
                            className="menu dropdown-content mt-3 p-2 shadow bg-white rounded-xl w-60"
                        >
                            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>

                            {!user && (
                                <>
                                    <li><NavLink to="/join-employee" className={navLinkClass}>Join as Employee</NavLink></li>
                                    <li><NavLink to="/join-hr" className={navLinkClass}>Join as HR Manager</NavLink></li>
                                    <li><NavLink to="/login" className={navLinkClass}>Login</NavLink></li>
                                </>
                            )}

                            {user && (
                                <>
                                    <li className="menu-title">Dashboard</li>
                                    {roleLinks.map(link => (
                                        <li key={link.to}>
                                            <NavLink to={link.to} className={navLinkClass}>
                                                {link.name}
                                            </NavLink>
                                        </li>
                                    ))}
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="px-4 py-2 text-sm rounded-lg w-full text-left text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:via-orange-400 hover:to-pink-500"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Navbar;
