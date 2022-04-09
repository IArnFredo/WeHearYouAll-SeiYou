import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useRef } from 'react';
import './UploadVoice.css';

const UploadVoice: React.FC = () => {
  const voiceNameRef = useRef<HTMLIonInputElement>(null);

  return (
    <IonPage className='bg-app'>
      <IonToolbar>
        <IonButtons slot='start'>
          <IonBackButton defaultHref='/@profile' />
        </IonButtons>
        <IonTitle>Upload New Voice</IonTitle>
      </IonToolbar>
      <IonContent className='ion-padding content'>
        <IonGrid className='ion-text-center'>
          <IonRow>
            <IonCol>
              <IonButton shape='round' className='select-voice-btn'>Select Voice</IonButton>
            </IonCol>
            <IonCol className='ion-align-self-center'>
              <IonText>
                <span className='select-voice-status'>No voice file selected</span>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem className='voice-name'>
                <IonInput ref={voiceNameRef} placeholder='Voice Name'></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem lines='none'>
                <IonLabel position='stacked' color='dark'>
                  <span className='voice-desc-label'>Voice Description</span>
                </IonLabel>
                <IonTextarea autoGrow className='voice-desc-textarea' rows={8}></IonTextarea>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton shape='round' className='upload-btn'>Upload Voice</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UploadVoice;
