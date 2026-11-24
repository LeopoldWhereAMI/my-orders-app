import { memo, type ChangeEvent } from "react";

type SearchInputProps = {
  className: string;
  placeholder: string;
  inputValue: string | number;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({
  className,
  placeholder,
  inputValue,
  handleInput,
}: SearchInputProps) => {
  console.log("SearchInput");

  return (
    <input
      type="text"
      id="search-input"
      className={className}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleInput}
    />
  );
};

export default memo(SearchInput);
