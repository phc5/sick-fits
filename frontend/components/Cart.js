import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import { useUser } from './User';
import formatMoney from '../lib/formatMoney';
import calculateTotalPrice from '../lib/calculateTotalPrice';
import { useCart } from '../context/CartContext';
import RemoveFromCart from './RemoveFromCart';

const StyledCartItem = styled.li`
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  padding: 1rem 0;

  img {
    margin-right: 1rem;
  }

  h3,
  p {
    margin: 0;
  }
`;

export default function Cart() {
  const user = useUser();
  const { isCartOpen, closeCart } = useCart();

  if (!user) return null;

  return (
    <CartStyles open={isCartOpen}>
      <header>
        <Supreme>{user.name}'s Cart</Supreme>
        <CloseButton onClick={closeCart} type="button">
          &times;
        </CloseButton>
      </header>

      <ul>
        {user?.cart?.map((cartItem) => (
          <CartItem key={cartItem?.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calculateTotalPrice(user?.cart))}</p>
      </footer>
    </CartStyles>
  );
}

function CartItem({ cartItem }) {
  const product = cartItem?.product;

  return (
    <StyledCartItem>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product?.name}
        height="100"
        width="100"
      />
      <div>
        <h3>{product?.name}</h3>
        <p>
          {formatMoney(product?.price * cartItem.quantity)} (
          <em>
            {cartItem.quantity} &times; {formatMoney(product?.price)} each
          </em>
          )
        </p>
      </div>
      <RemoveFromCart id={cartItem?.id} />
    </StyledCartItem>
  );
}
