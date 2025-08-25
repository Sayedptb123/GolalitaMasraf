import { useSelector } from "react-redux";

const useIsGuest = () => {
  const user = useSelector((state) => state.authReducer.user);

  return false;
};

export default useIsGuest;
