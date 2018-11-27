export const quantityCounter = list => {
  let quantity = 0;
  list.forEach(item => (quantity += item.quantity));
  return quantity;
};
