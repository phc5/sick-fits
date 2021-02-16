import PropTypes from 'prop-types';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <p>layout</p>
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};
