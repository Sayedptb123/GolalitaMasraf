import { useEffect, useState } from "react";
import { getOfferById } from "../../../../api/offers";

const useOffer = (productId) => {

  console.log("useOffer productId",productId)
  const [offer, setOffer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getOfferData = async () => {
    try {
      setLoading(true);
      const offer = await getOfferById(productId);

      console.log("useOffer offer",offer)
      if (!offer) {
        throw "err";
      }

      setOffer(offer);
    } catch (err) {
      console.log(err, "err");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      getOfferData();
    }
  }, [productId]);

  return {
    offer,
    loading,
    error,
  };
};

export default useOffer;
