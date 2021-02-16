import PropTypes from 'prop-types';

export default function Layout({ children }) {
  return (
    <div>
      <p>layout</p>
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};
