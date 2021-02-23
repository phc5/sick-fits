import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const DELETE_CART_ITEM_MUTATION = gql`
  mutation DELETE_CART_ITEM_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const StyledButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

export default function RemoveFromCart({ id }) {
  const [deleteCartItem, { loading, error, data }] = useMutation(
    DELETE_CART_ITEM_MUTATION,
    {
      variables: { id: id },
      update: (cache, payload) => {
        cache.evict(cache.identify(payload.data.deleteCartItem));
      },
    }
  );
  return (
    <StyledButton type="button" disabled={loading} onClick={deleteCartItem}>
      &times;
    </StyledButton>
  );
}
