import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full border border-green-200">
        <CheckCircle2 className="mx-auto mb-4 w-16 h-16 text-green-500" />
        <h1 className="text-2xl font-bold text-green-700 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. Your payment has been processed successfully.
        </p>
        <button
          className="btn btn-wide bg-orange-500 hover:bg-orange-600 text-white font-semibold"
          onClick={() => navigate("/home")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
