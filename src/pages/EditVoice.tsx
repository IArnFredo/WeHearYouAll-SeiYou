import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import React, { useRef } from 'react';
import './EditVoice.css';

const EditVoice: React.FC = () => {
  const voiceNameRef = useRef<HTMLIonInputElement>(null);

  return (
    <IonPage className='bg-app'>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref='/@your-voice-list' />
        </IonButtons>
        <IonTitle>Edit Voice</IonTitle>
      </IonToolbar>
      <IonContent className='ion-padding content'>
        <IonGrid className='ion-text-center'>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput autofocus ref={voiceNameRef} placeholder="Voice Name"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Voice Description</IonLabel>
                <IonTextarea className='voice-desc' rows={8}></IonTextarea>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton shape='round' className='upload-btn'>Update Voice</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditVoice;
