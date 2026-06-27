import type { ChangeEvent } from "react";

type SearchInputProps = {
  className: string;
  placeholder: string;
  inputValue: string | number;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput = ({
  className,
  placeholder,
  inputValue,
  handleInput,
}: SearchInputProps) => {
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
