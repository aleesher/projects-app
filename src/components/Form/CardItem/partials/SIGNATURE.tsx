import React from "react";

import { Sketch } from "dakota-2-portal/src/components";
import { Row } from "dakota-2-portal/src/styles/global";
import { CardText } from "components/Card";

import { IQuestion, QuestionType } from "components/Form/models";

interface IProps extends IQuestion {
  type: QuestionType;
  onChange: (value: any) => void;
}

const Signature = ({ text, onChange, value }: IProps) => {
  const val = JSON.parse(value || `{"paths": "", "base64": ""}`);
  return (
    <>
      <Row marginBottom={5}>
        <CardText>{text}</CardText>
      </Row>

      <Row marginBottom={22}>
        <CardText
          size="small"
          color="echoBlue"
        >
          * alle gegevens zijn zorgvuldig gecontroleerd
        </CardText>
      </Row>

      <Sketch
        isBase64Image
        savePaths
        signature={val.paths}
        onChange={onChange}
      />
    </>
  );
}

export default Signature;
