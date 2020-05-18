import React from "react";

import { TextedRadio } from "dakota-2-portal/src/components";
import { Row, Column } from "dakota-2-portal/src/styles/global";

import {
  CardContainer,
  CardTitle,
  CardSubtitle,
  CardLine
 } from "components/Card";

import { PictureReport, VoiceInputContainer } from "components/.";

const renderAdditionalInfo = (item: any, hasPicturePicker?: boolean, hasTextField?:boolean) => (
  <Row flexAlign="flex-start" marginBottom={30} marginTop={20}>
    { hasPicturePicker ? (
      <PictureReport
        {...item}
        value=""
        image=""
        onChange={() => null}
        onImageSelected={() => null}
        hasTextArea={hasTextField}
      /> ) : (
        <VoiceInputContainer
          label="Omschrijving"
          description="Max 250 tekens"
        />
      )
    }
  </Row>
)

export default ({ card }) => (
  <CardContainer>
    <CardTitle>{ card.title }</CardTitle>
    { card.info.map((infoItem, index: number) => (
      <React.Fragment key={infoItem.subtitle}>
        <Row marginBottom="15" marginTop={index !== 0 ? 45 : 9}>
          <CardSubtitle>
            { infoItem.subtitle }
          </CardSubtitle>
          <CardLine />
        </Row>
        { infoItem.fields.map(({ text, options, hasPicturePicker, hasTextField}, index:number) => (
          <Column flex={1} key={text}>
            <Row flex={1} marginBottom={index === infoItem.fields.length-1 ? 0 : 18}>
              <TextedRadio
                text={text}
                options={options}
                onPress={() => null}
                flexRatio={0.4}/>
            </Row>
            { (hasPicturePicker || hasTextField) && renderAdditionalInfo(infoItem, hasPicturePicker, hasTextField) }
          </Column>
          ))
        }
      </React.Fragment>
    ))}
  </CardContainer>
)