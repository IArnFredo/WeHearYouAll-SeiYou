import {
  IonRow,
  IonAvatar,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonCol,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Search.css";

export const VOICE_DATA = [
  {
    id: "v1",
    name: "Voice1",
    image: "https://icon-library.com/images/song-icon-png/song-icon-png-13.jpg",
  },
  {
    id: "v2",
    name: "Voice2",
    image: "https://icon-library.com/images/song-icon-png/song-icon-png-13.jpg",
  },
  {
    id: "v3",
    name: "Voice3",
    image: "https://icon-library.com/images/song-icon-png/song-icon-png-13.jpg",
  },
];

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const openVoiceHandler = () => {
    console.log("Edit voice");
    history.push("/@playing");
  };

  return (
    <IonPage>
      <IonContent className="bg-app" id="ion-content-search">
        <IonRow>
          <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
          <IonRow className="search-title">
          <IonLabel className="ion-margin">
            <b>Search</b>
          </IonLabel>
        </IonRow>
        <IonSearchbar
          className="searchBar"
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
          placeholder="Artist, Voices"
        ></IonSearchbar>
        <IonSegment className="segment" value="all">
          <IonSegmentButton className="segment-btn" value="all">
            <IonLabel className="segment-label">All</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton className="segment-btn" value="male">
            <IonLabel className="segment-label">Male</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton className="segment-btn" value="female">
            <IonLabel className="segment-label">Female</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <h3 className="ion-margin ion-text-center">Voices</h3>
        <IonRow>
          <IonCol>
            <IonList className="ion-margin-start ion-margin-end">
              {VOICE_DATA.map((voice) => (
                <IonItem
                  className="vList item-list-color-search"
                  lines="full"
                  button
                  onClick={openVoiceHandler}
                >
                  <IonAvatar className="avatar" slot="start">
                    <img src={voice.image} alt="" />
                  </IonAvatar>
                  <IonLabel className="label">{voice.name}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonCol>
        </IonRow>

        <h3 className="ion-margin ion-text-center">Artists</h3>
        <IonRow>
          <IonCol>
            <IonList className="ion-margin-start ion-margin-end">
              {VOICE_DATA.map((voice) => (
                <IonItem
                  className="vList item-list-color-search"
                  lines="full"
                  button
                  onClick={openVoiceHandler}
                >
                  <IonAvatar className="avatar" slot="start">
                    <img src={voice.image} alt="" />
                  </IonAvatar>
                  <IonLabel className="label">{voice.name}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonCol>
        </IonRow>
          </IonCol>
        </IonRow>
        
        
      </IonContent>
    </IonPage>
  );
};

export default Search;
