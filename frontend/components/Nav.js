import Link from 'next/link';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import { useCart } from '../context/CartContext';

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();

  const navigationLinks = user ? (
    <>
      <Link href="/sell">Sell</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account</Link>
      <SignOut />
      <button type="button" onClick={openCart}>
        🛒
      </button>
    </>
  ) : (
    <>
      <Link href="/signin">Sign In</Link>
    </>
  );

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {navigationLinks}
    </NavStyles>
  );
}
