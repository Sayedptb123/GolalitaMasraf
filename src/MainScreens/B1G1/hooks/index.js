import { useQuery } from "react-query";
import { getB1G1Offers } from "../../../api/offers";

const useB1G1Offers = () => {
  const { isLoading, isError, data, error } = useQuery(["B1G1"], () =>
    getB1G1Offers()
  );

  return { isLoading, isError, data, error };
};

export default useB1G1Offers;
