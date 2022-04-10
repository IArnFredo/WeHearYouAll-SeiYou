import { IonContent, IonLabel, IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonText } from '@ionic/react'
import React, { useState } from 'react';
import './Search.css';

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <IonPage className='bg-app'>
      <IonText className="title ion-margin">
        <h1><b>Search</b></h1>
      </IonText>
      <IonContent>
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
      </IonContent>
    </IonPage>
  );
};

export default Search