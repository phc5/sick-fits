import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();

  const navigationLinks = user ? (
    <>
      <Link href="/sell">Sell</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account</Link>
    </>
  ) : (
    <>
      <Link href="/signin">Sign In</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account</Link>
    </>
  );

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {navigationLinks}
    </NavStyles>
  );
}
