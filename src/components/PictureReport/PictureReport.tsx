import React from "react";

import { PicturePicker } from "dakota-2-portal/src/components";

import { VoiceInput } from "components/.";

import * as Styles from "./styles";

interface IProps {
  value: string;
  image?: string;
  onChange: (value: string) => void;
  onImageSelected: (uri: string) => void;
  hasTextArea?: boolean;
  onBlur?: () => void;
  onRemoveImage: (key: string) => void;
  errorText?: string;
}

const MAX_LENGTH = 250;

const PictureReport = ({
  value,
  image,
  onChange,
  onImageSelected,
  hasTextArea=true,
  onBlur=()=>null,
  onRemoveImage,
  errorText
}: IProps) => {
  return (
    <Styles.Container>
      <PicturePicker
        containerStyle={Styles.pickerContainerSTyle}
        previewStyle={Styles.coverSize}
        pictureButtonStyle={Styles.coverSize}
        images={image ? [image] : undefined}
        onChange={([newImage]) => onImageSelected(newImage)}
        onBlur={onBlur}
        format="file"
        onRemoveImage={onRemoveImage}
        errorText={errorText}
      />
      { hasTextArea &&
        <Styles.TextareaWrapper>
          <Styles.TitleWrapper>
            <Styles.Title>Omschrijving</Styles.Title>
            <Styles.LimitValue>Max {MAX_LENGTH - value.length} tekens</Styles.LimitValue>
          </Styles.TitleWrapper>
          <VoiceInput
            maxLength={MAX_LENGTH}
            value={value}
            onChangeText={onChange}
          />
        </Styles.TextareaWrapper>
      }
    </Styles.Container>
  );
};

export default PictureReport;
