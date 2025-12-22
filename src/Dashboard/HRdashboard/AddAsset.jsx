import { useState, useContext } from "react";
import { PackagePlus, ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";
import { getAuth } from "firebase/auth"; // ✅ Import Firebase auth

const AddAsset = () => {
    const { user } = useContext(AuthContext); // HR email reference
    const [loading, setLoading] = useState(false);

    const handleAddAsset = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;

        const assetData = {
            productName: form.productName.value,
            productImage: form.productImage.value,
            productType: form.productType.value,
            productQuantity: parseInt(form.productQuantity.value),
            availableQuantity: parseInt(form.productQuantity.value),
            dateAdded: new Date(),
            hrEmail: user?.email || "hr@test.com",
            companyName: form.companyName.value
        };

        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) {
                toast.error("Please login first as HR");
                setLoading(false);
                return;
            }

            const token = await currentUser.getIdToken(); // ✅ Get Firebase token

            const res = await fetch("https://asset-verse-server-mocha.vercel.app/assets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // ✅ Send token in header
                },
                body: JSON.stringify(assetData)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Asset added successfully!");
                form.reset();
            } else {
                toast.error(data.message || "Failed to add asset");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error. Check HR access.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-orange-100 to-pink-100 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-6 md:p-10">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-cyan-400 to-pink-500 p-3 rounded-2xl text-white shadow-md">
                        <PackagePlus size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Add New Asset</h2>
                        <p className="text-sm text-gray-500">Register a new company asset</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleAddAsset} className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>
                        <label className="text-sm font-semibold text-gray-600">Asset Name</label>
                        <input
                            type="text"
                            name="productName"
                            placeholder="e.g. Dell Laptop"
                            required
                            className="w-full mt-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-600">Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            placeholder="e.g. AssetVerse Ltd"
                            required
                            className="w-full mt-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-600">Asset Type</label>
                        <select
                            name="productType"
                            required
                            className="w-full mt-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                            <option value="">Select type</option>
                            <option value="Returnable">Returnable</option>
                            <option value="Non-returnable">Non-returnable</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-600">Quantity</label>
                        <input
                            type="number"
                            name="productQuantity"
                            min="1"
                            placeholder="e.g. 10"
                            required
                            className="w-full mt-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                            <ImageIcon size={18} /> Product Image URL
                        </label>
                        <input
                            type="text"
                            name="productImage"
                            placeholder="Enter image URL (ImgBB/Cloudinary)"
                            required
                            className="w-full mt-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    <div className="md:col-span-2 mt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-cyan-400 via-orange-400 to-pink-500 text-white font-bold py-3 rounded-2xl shadow-lg hover:scale-[1.02] transition transform disabled:opacity-60"
                        >
                            {loading ? "Adding Asset..." : "Add Asset"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAsset;
