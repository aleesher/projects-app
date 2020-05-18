import React from "react";

import { Column, Row } from "dakota-2-portal/src/styles/global";

import { CardText } from "components/Card";
import { IQuestion, QuestionType } from "components/Form/models";
import { VoiceInput, PriceInput, AddMore, TotalCard, ValidationError } from "components/.";
import { generateUniqueId } from "helpers/common";

interface IProps extends IQuestion {
  type: QuestionType;
  onChange: (value: any) => void;
  onBlur: () => void;
  hasError: object;
}

const getNewPrice = () => ({ id: generateUniqueId(), description: "", price: 0 });

const Price = ({ text, value, onChange, onBlur, hasError={} }: IProps) => {
  const { hasAddIcon, hasTotalColumn, hasDescriptionField, values: price, limit=6 } = JSON.parse(value);
  const totalPrice = price.reduce((acc, { price }) => acc + Number(price), 0);
  const handleValueChange = (name, value, id) => {
    const updatedPrice = price.map(p => p.id === id ? { ...p, [name]: value } : p);

    handleChange(updatedPrice);
  };

  const addPrice = () => {
    const updatedPrice = [...price, getNewPrice()];

    handleChange(updatedPrice);
  };

  const handleChange = (values) => {
    onChange(JSON.stringify({ hasAddIcon, hasTotalColumn, hasDescriptionField, values }));
  };

  return (
    <Column flex={1}>
      {price.map(({ price: priceValue, description, id }) => (
        <Column key={id} flex={1}>
          <Row
            marginBottom={16}
            hasError={hasError[id]}>
            {hasDescriptionField
              ? (
                <Column flex={0.8}>
                  <Row flexAlign="flex-start">
                    <Column flex={0.2} paddingTop={5}>
                      <CardText>{text}</CardText>
                        <CardText
                          size="small"
                          color="echoBlue"
                        >
                          Max 250 tekens
                        </CardText>
                    </Column>
                    <Column flex={0.78}>
                      <VoiceInput onChange={value => handleValueChange("description", value, id)} value={description} />
                    </Column>
                  </Row>
                </Column>
              )
              : (
                <Column flex={0.5}>
                  <CardText>{text}</CardText>
                </Column>
              )
            }
            <Column flex={hasDescriptionField ? 0.2 : 0.5}>
              <Row flexAlign="flex-start">
                <PriceInput
                  value={priceValue}
                  onBlur={onBlur}
                  onChange={value => handleValueChange("price", value, id)} />
              </Row>
            </Column>
          </Row>
          <ValidationError hasError={hasError[id]}/>
        </Column>
      ))}
      <Row>
        {hasAddIcon && price.length < limit && (
          <AddMore
            onClick={addPrice}
            hasAddIcon
            text="Voeg meer toe"
          />
        )}
      </Row>
      <Row>
        {hasTotalColumn && <TotalCard totalPrice={!isNaN(totalPrice) ? totalPrice : 0} />}
      </Row>
    </Column>
  );
};

export default Price;
