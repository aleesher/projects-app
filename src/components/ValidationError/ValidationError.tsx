import React from "react";
import _isEmpty from "lodash/isEmpty";

import { ErrorWrapper, ErrorMessage } from "./styles";

interface IProps {
  field?: string;
  hasError?: boolean;
  text?: string;
}

const ValidationError = ({ field="Veld", hasError, text="" }: IProps) => (
  hasError ? (
    <ErrorWrapper>
      <ErrorMessage> { !!text ? text : `${field} is verplicht` } </ErrorMessage>
    </ErrorWrapper>
  ) : <></>
);

export default ValidationError;
