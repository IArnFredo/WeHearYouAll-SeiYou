import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import React, { useRef } from 'react';

const EditVoice: React.FC = () => {
  const voiceNameRef = useRef<HTMLIonInputElement>(null);

  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref='/@your-voice-list' />
        </IonButtons>
        <IonTitle>Upload New Voice</IonTitle>
      </IonToolbar>
      <IonContent className='ion-padding'>
        <IonGrid className='ion-text-center'>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonInput ref={voiceNameRef} placeholder="Voice Name"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Voice Description</IonLabel>
                <IonTextarea placeholder="Voice description..."></IonTextarea>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton>Update Voice</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditVoice;
