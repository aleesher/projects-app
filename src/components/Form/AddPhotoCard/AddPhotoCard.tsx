import React from "react";
import { PicturePicker } from "dakota-2-portal/src/components";

import { CardContainer } from "components/Card";

import * as Styles from "./styles";

const AddPhotoCard = () => {
  const [isOpened, onToggle] = React.useState(false);
  const [photos, setPhotos] = React.useState([] as any);

  const toggleAddButton = (isOpened) => {
    if(isOpened){
      setPhotos([])
    }

    onToggle(!isOpened)
  }

  return (
    <CardContainer>
      <Styles.Header>
        <Styles.TitleWrapper>
          <Styles.Title>Foto's</Styles.Title>
          <Styles.SubTitle>Optioneel</Styles.SubTitle>
        </Styles.TitleWrapper>

        <Styles.AddButton onPress={() => toggleAddButton(isOpened)}>
          {isOpened
            ? (
              <>
                <Styles.RemoveIcon />
                <Styles.AddTextWrapper>
                  <Styles.AddText>Foto's verwijderen</Styles.AddText>
                </Styles.AddTextWrapper>
              </>
            )
            : (
              <>
                <Styles.AddIcon />
                <Styles.AddTextWrapper>
                  <Styles.AddText cancel>Foto's toevoegen</Styles.AddText>
                </Styles.AddTextWrapper>
              </>
            )
          }
        </Styles.AddButton>
      </Styles.Header>
      {isOpened && (
        <Styles.PicturesWrapper>
          {photos.map(photo => (
            <PicturePicker
              key={photo}
              uris={[photo]}
              onChange={([photo]) => setPhotos(photos.filter(p => p !== photo))}
            />
          ))}
          <PicturePicker onChange={([photo]) => setPhotos([...photos, photo])} multiple={true}/>
        </Styles.PicturesWrapper>
      )}
    </CardContainer>
  );
};

export default AddPhotoCard;
