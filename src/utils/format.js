export const formatPrice = (price = 0) => {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(2)} Crore`;
  } else if (price >= 100000) {
    return `${(price / 100000).toFixed(2)} Lac`;
  } else if (price >= 10000) {
    return `${(price / 10000).toFixed(2)} K`;
  } else return price;
};
