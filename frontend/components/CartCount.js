import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const StyledDot = styled.div`
  background: var(--red);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabuler-nums;
`;

const StyledAnimation = styled.span`
  position: relative;

  .count {
    display: block;
    position: relative;
    transition: transform 0.2s;
    backface-visibility: hidden;
  }

  .count-enter {
    transform: scale(1.5) rotate(0.5turn);
  }

  .count-enter-active {
    transform: rotateX(0);
  }

  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }

  .count-exit-active {
    transform: scale(1.5) rotate(0.5turn);
  }
`;

export default function CartCount({ count }) {
  return (
    <StyledAnimation>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          classNames="count"
          className="count"
          key={count}
          timeout={{ enter: 100, exit: 100 }}
        >
          <StyledDot>{count}</StyledDot>
        </CSSTransition>
      </TransitionGroup>
    </StyledAnimation>
  );
}
