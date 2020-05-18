import React from "react";

import { TextInput } from "dakota-2-portal/src/components";

import * as Styles from "./styles";

interface IProps {
  value: string;
  placeholder?: string;
  onSearch: (e: any) => void;
}

const SearchInput = ({ value, placeholder = "", onSearch }: IProps) => (
  <Styles.Container>
    <Styles.SearchIcon />
    <TextInput
      onChangeText={onSearch}
      placeholder={placeholder}
      value={value}
      style={Styles.TextInputStyles}
    />
  </Styles.Container>
);

export default SearchInput;
