const ProfilePage = () => {
  useEffect(() => {
    api.get("/orders/my-orders").then((res) => setOrders(res.data.data));
  }, []);
  return <div>ProfilePage</div>;
};

export default ProfilePage;
