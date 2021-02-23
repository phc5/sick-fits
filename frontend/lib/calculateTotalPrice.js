export default function calculateTotalPrice(cart) {
  return cart.reduce((acc, curr) => {
    if (!curr.product) return acc;

    return acc + curr.quantity * curr.product.price;
  }, 0);
}
