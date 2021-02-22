import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';

import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSignOut() {
    await signout();
  }

  function onEnterPress(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleSignOut();
    }
  }
  return (
    <a
      onClick={handleSignOut}
      onKeyPress={onEnterPress}
      role="button"
      tabIndex={0}
    >
      Sign Out
    </a>
  );
}
