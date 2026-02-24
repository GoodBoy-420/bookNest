import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAxios from "../../hooks/useAxios";

const CheckoutModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { api } = useAxios();
  const { auth } = useAxios();

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const formObject = Object.fromEntries(formData.entries());

      
        const res = await api.post(
          `${import.meta.env.VITE_BASE_URL}/order/create-checkout-session`,
          { shippingAddress: formObject },
        );
        if (res.data.success) {
          window.location.href = res.data.message.url;
        } else {
          throw new Error(res.data.message || "Login failed");
        }
     
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 w-100 rounded-lg"
      >
        <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>

        <form onSubmit={submitForm} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Enter your mobile number"
            required
          />

          <input
            type="text"
            name="addressLine"
            placeholder="Enter your address"
            required
          />

          <input type="text" name="city" placeholder="Enter city" required />

          <input
            type="text"
            name="postalCode"
            placeholder="Enter postal code"
            required
          />
          <input type="hidden" name="country" value="Bangladesh"></input>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 text-white py-2 mt-4 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Redirecting..." : "Proceed to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
