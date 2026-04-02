import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/api";

export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handlePayment = async () => {
    setTimeout(async () => {
      await API.post("/progress/enroll", {
        courseId: id,
      });

      alert("Payment Successful 🎉");
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="pt-20 flex justify-center">
        <div className="bg-white p-8 rounded-xl shadow w-[400px] text-center">
          <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>

          <p className="mb-6 text-gray-600">
            Pay ₹499 to unlock this course
          </p>

          <button
            onClick={handlePayment}  // ✅ FIXED
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}