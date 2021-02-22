import { useEffect, useState } from 'react';

export default function useForm(initialState = {}) {
  const [inputs, setInputs] = useState(initialState);
  const initialValues = Object.values(initialState).join('');

  useEffect(() => {
    setInputs(initialState);
  }, [initialValues]);

  function handleChange(event) {
    let { value, name, type } = event.target;

    if (type === 'number') value = parseInt(value) || value;
    if (type === 'file') [value] = event.target.files;

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    console.log(initialState);
    setInputs(initialState);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ''])
    );
    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
