import { IonAvatar, IonContent, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonSegment, IonSegmentButton } from '@ionic/react'
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './Search.css';

export const VOICE_DATA = [
  {id: 'v1', name: 'Voice1', image: 'https://icon-library.com/images/song-icon-png/song-icon-png-13.jpg'},
  {id: 'v2', name: 'Voice2', image: 'https://icon-library.com/images/song-icon-png/song-icon-png-13.jpg'},
  {id: 'v3', name: 'Voice3', image: 'https://icon-library.com/images/song-icon-png/song-icon-png-13.jpg'}
];

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const history = useHistory();

  const openVoiceHandler = () => {
    console.log('Edit voice');
    history.push('/@playing');
  };

  return (
    <IonPage className='bg-app'>
      <IonContent>
        <div className="wrapper">
          <h1 className="title ion-margin"><b>Search</b></h1>
        </div>
        <IonSearchbar className="searchBar" value={searchText} onIonChange={e => setSearchText(e.detail.value!)} placeholder="Artist, Voices"></IonSearchbar>
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
        <IonList className="ion-margin">
          {VOICE_DATA.map(voice => (
            <IonItem color="medium" className="vList" lines="full"
                    button
                    onClick={openVoiceHandler}>
              <IonAvatar className="avatar" slot="start">
                  <img src={voice.image} alt="" />
              </IonAvatar>
              <IonLabel className="label">{voice.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        <h3 className="ion-margin ion-text-center">Artists</h3>
        <IonList className="ion-margin">
          {VOICE_DATA.map(voice => (
            <IonItem color="medium" className="vList" lines="full"
                    button
                    onClick={openVoiceHandler}>
              <IonAvatar className="avatar" slot="start">
                  <img src={voice.image} alt="" />
              </IonAvatar>
              <IonLabel className="label">{voice.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Search