export const transformOffersData = (offers) => {
  const transformedOffers = offers.map((offer) => ({
    ...offer,
    name: offer.name,
    image_icon: offer.image_url,
    id: offer.id,
  }));

  return transformedOffers;
};
