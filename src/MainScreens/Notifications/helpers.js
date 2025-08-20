export const transformDate = (dateStr) => {
  console.log("transformDate:",dateStr)
  if (!dateStr) {
    return "";
  }

  const a = new Date(dateStr)
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .replace(/[AP]/, " $&");

  return a;
};
