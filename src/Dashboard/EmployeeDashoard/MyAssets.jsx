import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import RobotLoader from "../../RobotLoader/RobotLoader";
import "../../RobotLoader/RobotLoader.css";

const MyAssets = () => {
    const { user } = useContext(AuthContext);
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("All");

    // Fetch assigned assets for logged-in employee
    useEffect(() => {
        if (!user?.email) return;

        axios
            .get(`http://localhost:3000/assigned-assets?email=${user.email}`)
            .then(res => {
                // Ensure approvalDate exists in each asset
                const dataWithApprovalDate = res.data.map(a => ({
                    ...a,
                    approvalDate: a.approvalDate || a.assignmentDate // fallback if missing
                }));
                setAssets(dataWithApprovalDate || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to fetch assigned assets");
                setLoading(false);
            });
    }, [user?.email]);

    // Handle return asset
    const handleReturn = async (id) => {
        const confirmReturn = confirm("Are you sure you want to return this asset?");
        if (!confirmReturn) return;

        try {
            await axios.put(`http://localhost:3000/assignedAssets/return/${id}`);
            setAssets(prev =>
                prev.map(asset =>
                    asset._id === id
                        ? { ...asset, status: "returned" }
                        : asset
                )
            );
            toast.success("Asset returned successfully!");
        } catch (err) {
            console.error("Return failed", err);
            toast.error("Failed to return asset");
        }
    };

    // Filtering logic
    const filteredAssets = assets.filter(asset => {
        const matchesSearch = asset.assetName?.toLowerCase().includes(search.toLowerCase());
        const matchesType = filterType === "All" || asset.assetType === filterType;
        return matchesSearch && matchesType;
    });

    if (loading) {
        return <RobotLoader></RobotLoader>;
    }

    return (
        <div className="p-6">
            {/* Header */}
            <h2 className="text-3xl font-bold mb-2 text-gray-800">My Assets</h2>
            <p className="text-gray-500 mb-6">
                Assets assigned to you from all companies
            </p>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by asset name"
                    className="input input-bordered w-full md:w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="select select-bordered w-full md:w-1/4"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="All">All Types</option>
                    <option value="Returnable">Returnable</option>
                    <option value="Non-returnable">Non-returnable</option>
                </select>
            </div>

            {/* Empty State */}
            {filteredAssets.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-lg font-medium">No assets found</p>
                    <p className="text-gray-500">
                        You don’t have any assigned assets yet.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full table-auto">
                        <thead className="bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 text-white">
                            <tr>
                                <th>Asset</th>
                                <th>Type</th>
                                <th>Company</th>
                                <th>Assigned Date</th>
                                <th>Approval Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAssets.map(asset => (
                                <tr key={asset._id} className="hover:bg-gray-50 transition">
                                    {/* Asset Info */}
                                    <td className="flex items-center gap-3">
                                        <img
                                            src={asset.productImage || asset.assetImage}
                                            alt={asset.assetName}
                                            className="w-12 h-12 object-contain rounded-lg p-1 bg-white shadow-sm"
                                        />
                                        <span className="font-medium text-gray-800">{asset.assetName || asset.productName}</span>
                                    </td>

                                    <td>
                                        <span className="badge badge-outline">
                                            {asset.assetType || asset.productType}
                                        </span>
                                    </td>

                                    <td>{asset.companyName}</td>

                                    <td>
                                        {asset.assignmentDate
                                            ? new Date(asset.assignmentDate).toLocaleDateString()
                                            : "—"}
                                    </td>

                                    <td>
                                        {asset.approvalDate
                                            ? new Date(asset.approvalDate).toLocaleDateString()
                                            : "—"}
                                    </td>

                                    <td>
                                        <span
                                            className={`badge ${asset.status === "assigned"
                                                    ? "badge-success"
                                                    : asset.status === "pending"
                                                        ? "badge-warning"
                                                        : "badge-ghost"
                                                }`}
                                        >
                                            {asset.status}
                                        </span>
                                    </td>

                                    <td>
                                        {asset.status === "assigned" && asset.assetType === "Returnable" && (
                                            <button
                                                className="btn btn-sm btn-warning"
                                                onClick={() => handleReturn(asset._id)}
                                            >
                                                Return
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyAssets;
