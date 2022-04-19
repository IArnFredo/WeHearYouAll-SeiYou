import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react';
import './Profile.css';

const AnotherProfile: React.FC = () => {

  return (
    <IonPage className='bg-app'>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>Back Button</IonTitle>
      </IonToolbar>
      <IonContent fullscreen className='ion-padding' id='bg'>
        <IonRow>
          <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
            <img className='avatar-profile' src='./assets/images/shionne.jpg' />
            <IonCardHeader class='text-profile'>
              <IonCardTitle>Yudhistira Aremaputra Wardhana</IonCardTitle>
                        
              <IonCardSubtitle>Male, 20</IonCardSubtitle>
                        
            </IonCardHeader>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
          <IonCardTitle class='text-profile'>Voices</IonCardTitle>
          <IonList className="ion-margin">
            
              <IonItem className="vList" lines="full"
                      button>
                <IonAvatar className="avatar" slot="start">
                    <img src='https://icon-library.com/images/song-icon-png/song-icon-png-13.jpg' alt="" />
                </IonAvatar>
                <IonLabel className="label">judul voice</IonLabel>
              </IonItem>
            
        </IonList>
          </IonCol>
        </IonRow>     
      </IonContent>
    </IonPage>
    
  )
}

export default AnotherProfile