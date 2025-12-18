import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";

const AllRequests = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all requests for this HR
    useEffect(() => {
        axios
            .get(`http://localhost:3000/requests?hrEmail=${user.email}`)
            .then((res) => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to fetch requests");
                setLoading(false);
            });
    }, [user.email]);

    // Approve or Reject request
    const handleAction = async (id, action) => {
        try {
            await axios.put(`http://localhost:3000/requests/${id}`, {
                requestStatus: action,
                processedBy: user.email
            });

            setRequests((prev) =>
                prev.map((r) =>
                    r._id === id ? { ...r, requestStatus: action } : r
                )
            );

            toast.success(`Request ${action} successfully`);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update request");
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading requests...</div>;
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">
                All Asset Requests
            </h2>
            <p className="text-gray-500 mb-6">
                Review and manage employee asset requests
            </p>

            {requests.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-lg font-medium">No requests found</p>
                    <p className="text-gray-500">
                        There are no asset requests at the moment.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-2xl shadow-lg divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 ">
                            <tr>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Asset
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Employee
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Company
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {requests.map((request) => (
                                <tr key={request._id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap flex items-center justify-center sm:justify-start gap-3">
                                        <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 bg-gray-100 rounded-lg overflow-hidden">
                                            <img
                                                src={request.assetImage || request.productImage || "https://via.placeholder.com/150"}
                                                alt={request.assetName}
                                                className="max-h-full max-w-full object-contain"
                                            />
                                        </div>
                                        <span className="font-medium text-gray-800 text-center sm:text-left">
                                            {request.assetName}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-600">
                                        {request.requesterName}<br/>
                                        <span className="text-xs text-gray-400">{request.requesterEmail}</span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-600">
                                        {request.companyName}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-600">
                                        {request.assetType}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            request.requestStatus === "pending"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : request.requestStatus === "approved"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}>
                                            {request.requestStatus.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap flex justify-center gap-2">
                                        {request.requestStatus === "pending" ? (
                                            <>
                                                <button
                                                    className="py-1 px-3 bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 text-white rounded-lg text-sm font-medium hover:scale-105 transition transform"
                                                    onClick={() => handleAction(request._id, "approved")}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="py-1 px-3 bg-red-500 text-white rounded-lg text-sm font-medium hover:scale-105 transition transform"
                                                    onClick={() => handleAction(request._id, "rejected")}
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-sm text-gray-500 italic">
                                                No actions
                                            </span>
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

export default AllRequests;




// HR adds assets
// ↓
// Employee sees assets
// ↓
// Employee requests asset
// ↓
// HR approves request
// ↓
// assignedAssets auto-created

