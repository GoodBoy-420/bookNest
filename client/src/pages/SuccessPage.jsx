import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAxios from "../hooks/useAxios";
import { useCart } from "../hooks/useCart";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { api } = useAxios();

  useEffect(() => {
    const handleSuccess = async () => {
      try {
        // Refetch cart (it should be empty after webhook)
        await api.get("/cart");
        clearCart();

        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    };

    handleSuccess();
  }, []);

  return (
    <div className="flex justify-center items-center h-[60vh]">
      <h1 className="text-2xl font-semibold">Processing your payment...</h1>
    </div>
  );
};

export default SuccessPage;
