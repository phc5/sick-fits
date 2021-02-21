import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false,
    read: (existing = [], { args, cache }) => {
      const { skip, first } = args;

      // read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const totalPages = Math.ceil(count / first);

      // check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      // if there are items and there aren't enough items to satifsy how many were requetsed and we are on the page
      if (items.length && items.length !== first && page === totalPages) {
        return items;
      }

      if (items.length !== first) {
        return false;
      }

      if (items.length) {
        return items;
      }

      return false;
    },
    merge: (existing, incoming, { args }) => {
      const { skip, first } = args;
      // this runs when Apollo client come back from network with products and what to do with it in cache
      console.log(existing, incoming, args);

      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  };
}
