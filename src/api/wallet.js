import axios from "axios";

export const getBase64PkpassFile = async (data) => {
  const res = await axios.post(
    "https://golalitatwffer.com/api/go/auth/pass/v2",
    data
  );

  const pkpassLink = res.data?.payload;

  if (!pkpassLink) {
    throw new Error();
  }

  return pkpassLink;
};
