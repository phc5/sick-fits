import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { useCart } from '../context/CartContext';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id }) {
  const { openCart } = useCart();
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function onCartClick(event) {
    event.preventDefault();
    await addToCart();
    openCart();
  }
  return (
    <button disabled={loading} type="button" onClick={onCartClick}>
      Add{loading && 'ing'} to cart 🛒
    </button>
  );
}
