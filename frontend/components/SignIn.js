import { gql } from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import ErrorMessage from './ErrorMessage';
import useForm from '../hooks/useForm';
import Form from './styles/Form';

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }

      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data, loading }] = useMutation(SIGN_IN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(event) {
    event.preventDefault();
    await signin();
    resetForm();
    inputs.password = '';
  }

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign In to your account</h2>
      <ErrorMessage error={error} />
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Your email address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Your password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
}
