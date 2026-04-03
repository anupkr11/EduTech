import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/api";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51TI0sm9yNPKExd6gg261yx1VjYtAJTm7mCWmA1zRcIKLBCk6XXk5x7TRscBW3oS0MgW76UtPJgHErnvBwnRfnJ8k007QgwHaun"); // 🔥 replace with your key

export default function PaymentPage() {
  const { id } = useParams();

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;

      // 🔥 call backend to create session
      const res = await API.post("/payment/create-checkout-session", {
        courseId: id,
        title: "Course Payment",
      });

      // 🔥 redirect to Stripe Checkout
      window.location.href = res.data.url;

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="pt-20 flex justify-center">
        <div className="bg-white p-8 rounded-xl shadow w-[400px] text-center">
          
          <h2 className="text-2xl font-bold mb-4">
            Complete Payment
          </h2>

          <p className="mb-6 text-gray-600">
            Pay ₹499 to unlock this course
          </p>

          <button
            onClick={handlePayment}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}