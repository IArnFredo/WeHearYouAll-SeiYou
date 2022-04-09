import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonRow, IonText, IonToolbar } from '@ionic/react'
import React from 'react'

const RecordVoice: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='tool'>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/@profile'></IonBackButton>
            <IonText>Record Your Voice</IonText>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className='content ion-text-center' fullscreen>
        <IonButton className='recButton' color='danger'>
          <img src="../assets/images/recButton.png" alt="" />
        </IonButton><br />
        <IonButton className='playButton' color='primary'>
          <img src="../assets/images/playButton.png" alt="" />
        </IonButton>
        <IonRow className='ion-justify-content-center ion-margin-top'>
          <IonButton className='buttonSize' shape='round'>Delete</IonButton>
        </IonRow>
        <IonRow className='ion-justify-content-center'>
          <IonButton shape='round'>Continue</IonButton>
        </IonRow>
      </IonContent>
    </IonPage>
  )
}

export default RecordVoice