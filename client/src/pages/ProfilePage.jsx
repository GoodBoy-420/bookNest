import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

const ProfilePage = () => {
  const [order, setOrder] = useState(null);
  const { api } = useAxios();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_BASE_URL}/order/get-my-orders`,
        );
        setOrder(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, [order]);
  console.log(order);
  return <div>ProfilePage</div>;
};

export default ProfilePage;
