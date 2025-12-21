import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Boxes, Check } from "lucide-react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";
import RobotLoader from "../../RobotLoader/RobotLoader";
import "../../RobotLoader/RobotLoader.css";

// ✅ Recharts imports (ONLY ADDITION)
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Asset = () => {
  const { user, loading } = useContext(AuthContext);

  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const [dataLoading, setDataLoading] = useState(true);

  // ✅ Chart state (ONLY ADDITION)
  const [chartData, setChartData] = useState([]);

  const [editAsset, setEditAsset] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    if (!user?.email) return;
    fetchAssets();
  }, [page, user?.email]);

  /* ================= FETCH ASSETS ================= */
  const fetchAssets = async () => {
    try {
      setDataLoading(true);
      const res = await axios.get(
        `${API_URL}/assets?page=${page}&limit=${limit}`
      );

      const userAssets = res.data.assets.filter(
        asset => asset.hrEmail === user.email
      );

      setAssets(userAssets);
      setTotal(userAssets.length);

      // ✅ Build chart data from EXISTING assets (NO new API)
      const formattedChartData = userAssets.map(asset => ({
        name: asset.productName,
        total: asset.productQuantity,
        available: asset.availableQuantity,
      }));

      setChartData(formattedChartData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load assets");
    } finally {
      setDataLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this asset?")) return;

    try {
      await axios.delete(`${API_URL}/assets/${id}`);
      toast.success("Asset deleted successfully");
      fetchAssets();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete asset");
    }
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/assets/${editAsset._id}`, {
        productName: editAsset.productName,
        productQuantity: editAsset.productQuantity,
        availableQuantity: editAsset.availableQuantity,
        productType: editAsset.productType,
      });
      toast.success("Asset updated successfully");
      setEditAsset(null);
      fetchAssets();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update asset");
    }
  };

  const filteredAssets = assets.filter(asset =>
    asset.productName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(total / limit);

  if (loading) return <RobotLoader />;

  return (
    <div className="p-4 md:p-6">

      {/* HEADER */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 p-6 text-white shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Boxes /> Asset List
        </h1>
        <p className="text-sm mt-1 opacity-90">
          View and manage your assets
        </p>
      </div>

      {/* ✅ BAR CHART (ONLY NEW UI PART) */}
      <div className="mb-6 bg-white rounded-2xl shadow-md p-5">
        <h2 className="text-lg font-semibold mb-4">
          Asset Quantity Overview
        </h2>

        {chartData.length === 0 ? (
          <p className="text-center text-gray-500">
            No chart data available
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#22d3ee" name="Total Quantity" />
              <Bar dataKey="available" fill="#fb7185" name="Available Quantity" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* SEARCH */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search asset by name..."
          className="input input-bordered w-full md:w-72 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        {dataLoading ? (
          <div className="p-10 text-center">
            <RobotLoader />
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No assets found
          </div>
        ) : (
          <table className="table w-full min-w-[600px]">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Total</th>
                <th>Available</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset, index) => (
                <tr key={asset._id}>
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td>
                    <img
                      src={asset.productImage}
                      className="w-12 h-12 rounded-xl"
                    />
                  </td>
                  <td>{asset.productName}</td>
                  <td>{asset.productType}</td>
                  <td>{asset.productQuantity}</td>
                  <td>{asset.availableQuantity}</td>
                  <td>
                    {new Date(asset.dateAdded).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      onClick={() => setEditAsset(asset)}
                      className="btn btn-sm btn-outline btn-info mr-2"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(asset._id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION (UNCHANGED) */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          {[...Array(totalPages).keys()].map(num => (
            <button
              key={num}
              className={`btn btn-sm ${page === num + 1 ? "btn-primary" : ""}`}
              onClick={() => setPage(num + 1)}
            >
              {num + 1}
            </button>
          ))}
          <button
            className="btn btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* UPDATE MODAL (UNCHANGED) */}
      {editAsset && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Update Asset</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                className="input input-bordered w-full"
                value={editAsset.productName}
                onChange={e =>
                  setEditAsset({ ...editAsset, productName: e.target.value })
                }
              />
              <input
                type="number"
                className="input input-bordered w-full"
                value={editAsset.productQuantity}
                onChange={e =>
                  setEditAsset({
                    ...editAsset,
                    productQuantity: Number(e.target.value),
                  })
                }
              />
              <input
                type="number"
                className="input input-bordered w-full"
                value={editAsset.availableQuantity}
                onChange={e =>
                  setEditAsset({
                    ...editAsset,
                    availableQuantity: Number(e.target.value),
                  })
                }
              />
              <select
                className="select select-bordered w-full"
                value={editAsset.productType}
                onChange={e =>
                  setEditAsset({ ...editAsset, productType: e.target.value })
                }
              >
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>

              <div className="modal-action">
                <button className="btn btn-primary">
                  <Check size={16} /> Update
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setEditAsset(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Asset;
