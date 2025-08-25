import { useSelector } from "react-redux";

const useIsGuest = () => {
  const user = useSelector((state) => state.authReducer.user);

  return user && user.email === "test@masrif.com";
};

export default useIsGuest;
