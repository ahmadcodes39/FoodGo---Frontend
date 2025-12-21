import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full border border-orange-200">
        <XCircle className="mx-auto mb-4 w-16 h-16 text-orange-500" />
        <h1 className="text-2xl font-bold text-orange-700 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment was not completed. You can try again or return home.
        </p>
        <button
          className="btn btn-wide bg-green-500 hover:bg-green-600 text-white font-semibold"
          onClick={() => navigate("/home")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
