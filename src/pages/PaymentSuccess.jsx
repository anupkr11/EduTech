import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function PaymentSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const enroll = async () => {
      await API.post("/progress/enroll", {
        courseId: id,
      });

      navigate("/dashboard");
    };

    enroll();
  }, []);

  return <div>Payment Successful 🎉</div>;
}