import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function resetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </div>
    );
  }
  return <Reset token={query?.token} />;
}
