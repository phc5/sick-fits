import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  html {
    --red: #ff0000;
    --black: #393939;
    --grey: #3A3A3A;
    --gray: var(--grey);
    --lightGrey: #E1E1E1;
    --lightGray: var(--lightGrey);
    --offWhite: #EDEDED;
    --maxWidth: 1000px;
    --boxShadow: 0 12px 24px 0 rgba(0,0,0,0.09);
    box-sizing: border-box;
    font-size: 62.5%;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: 'radnika_next', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.5rem;
    line-height: 2;
    margin: 0;
    padding: 0;
  }

  a{
    text-decoration: none;
    color: var(--black);

    :hover {
      text-decoration: underline;
    }
  }

  button {
    font-family: ---apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
`;

const StyledInner = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

export default function Layout({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <StyledInner>{children}</StyledInner>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};
