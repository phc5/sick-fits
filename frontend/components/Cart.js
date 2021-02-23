import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import { useUser } from './User';
import formatMoney from '../lib/formatMoney';
import calculateTotalPrice from '../lib/calculateTotalPrice';

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
  if (!user) return null;
  console.log(user);
  return (
    <CartStyles open>
      <header>
        <Supreme>{user.name}'s Cart</Supreme>
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
    </StyledCartItem>
  );
}
