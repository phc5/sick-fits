import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import { gql } from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );

  const debouncedFindItems = debounce(findItems, 350);

  resetIdCounter();

  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: data?.allProducts || [],
    itemToString: (item) => item?.name || '',
    onInputValueChange: () => {
      debouncedFindItems({ variables: { searchTerm: inputValue } });
    },
    onSelectedItemChange: ({ selectedItem }) => {
      router.push({ pathname: `/product/${selectedItem?.id}` });
    },
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          data?.allProducts?.map((product, index) => (
            <DropDownItem
              key={`${product.id}`}
              {...getItemProps({ item: product, index })}
              highlighted={index === highlightedIndex}
            >
              <img
                src={product?.photo?.image?.publicUrlTransformed}
                alt={product?.name}
                width="50"
              />
              {product.name}
            </DropDownItem>
          ))}
        {isOpen && !data?.allProducts.length && !loading && (
          <DropDownItem>Sorry no items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
