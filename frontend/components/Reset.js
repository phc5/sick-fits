import Link from 'next/link';
import { gql } from 'graphql-tag';
import { useMutation } from '@apollo/client';
import ErrorMessage from './ErrorMessage';
import useForm from '../hooks/useForm';
import Form from './styles/Form';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  async function handleSubmit(event) {
    event.preventDefault();
    await reset();
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset your password</h2>
      <ErrorMessage error={error || successfulError} />
      {data?.redeemUserPasswordResetToken === null && (
        <p>
          Success! You can <Link href="/signin">sign in</Link>!
        </p>
      )}
      <fieldset aria-busy={loading}>
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
        <label htmlFor="token">
          Token
          <input
            id="token"
            name="token"
            type="text"
            placeholder="Reset token"
            value={inputs.token}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Request reset</button>
      </fieldset>
    </Form>
  );
}
