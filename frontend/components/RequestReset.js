import Router from 'next/router';
import { gql } from 'graphql-tag';
import { useMutation } from '@apollo/client';
import ErrorMessage from './ErrorMessage';
import useForm from '../hooks/useForm';
import Form from './styles/Form';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [resetPassword, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  async function handleSubmit(event) {
    event.preventDefault();
    await resetPassword();
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <ErrorMessage error={error} />
      {data?.sendUserPasswordResetLink === null && (
        <p>Success! Please check your email for a link!</p>
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

        <button type="submit">Request reset</button>
      </fieldset>
    </Form>
  );
}
