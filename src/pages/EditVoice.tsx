import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { pencilOutline } from 'ionicons/icons';
import React, { useRef } from 'react';
import './EditVoice.css';

const EditVoice: React.FC = () => {
  const voiceNameRef = useRef<HTMLIonInputElement>(null);

  return (
    <IonPage className='bg-app'>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref='/your-voice-list' />
        </IonButtons>
        <IonTitle>Edit Voice</IonTitle>
      </IonToolbar>
      <IonContent className='ion-padding ion-content-editvoice'>
        <IonGrid className='ion-text-center'>
          <IonRow>
            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
              <img
                    src={"/assets/images/allphen.png"}
                    className="radius-pic-edit-profile"
                    alt="profile"
                />
                <div className="centered-title-edit">
                  <IonIcon
                    className="pencil"
                    size="small"
                    color="dark"
                    icon={pencilOutline}
                  ></IonIcon>
                </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
              <IonItem className='voice-name'>
                <IonInput autofocus ref={voiceNameRef} placeholder="Voice Name"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
              <IonItem lines='none'>
                <IonLabel position='stacked' color='dark'>
                  <span className='voice-desc-label'>Voice Description</span>
                </IonLabel>
                <IonTextarea autoGrow className='voice-desc-textarea' rows={8}></IonTextarea>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
              <IonButton shape='round' className='upload-btn'>Update Voice</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(EditVoice);
