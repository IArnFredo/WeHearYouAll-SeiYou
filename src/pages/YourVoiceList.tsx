import { IonHeader, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonAvatar, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonAlert, IonToast, IonToolbar } from '@ionic/react';
import { trashSharp, createSharp } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';

export const VOICE_DATA = [
    {id: 'd1', name: 'Alvin', image: 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'},
    {id: 'd2', name: 'Martin', image: 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'},
    {id: 'd3', name: 'Djong', image: 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'}
];

const YourVoiceList = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [startDeleting, setStartDeleting] = useState(false);
  const slidingOptionRef = useRef<HTMLIonItemSlidingElement>(null);
  const history = useHistory();
  
  const startEditVoiceHandler = () => {
    slidingOptionRef.current?.closeOpened();
    console.log('Edit voice');
    history.push('/@edit-voice');
  };
  
  const startDeleteVoiceHandler = () => {
    slidingOptionRef.current?.closeOpened();
    setStartDeleting(true);
  };
  
  const deleteVoiceHandler = () => {
    setStartDeleting(false);
    setToastMessage("Deleted Friend!")
  };
  
  const playingVoiceHandler = () => {
    slidingOptionRef.current?.closeOpened();
    console.log('Playing voice');
    history.push('/@playing');
  };

  return (
    <React.Fragment>
      <IonAlert isOpen={startDeleting}
          header="Are you sure?"
          message="Do you want to delete your Voice? This cannot be undone."
          buttons={[
              {text: 'No', role: 'cancel', handler: () => {setStartDeleting(false)}},
              {text: 'Yes', handler: deleteVoiceHandler}
          ]}/>
      <IonToast isOpen={!!toastMessage}
                message={toastMessage}
                duration={2000}
                onDidDismiss={() => {setToastMessage('')}}/>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
              <IonBackButton defaultHref="/@profile"/>
          </IonButtons>
          <IonTitle>Your Voices</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <IonTitle class="ion-margin ion-text-center">Voices</IonTitle>
          <IonList>
            {VOICE_DATA.map(voice => (
              <IonItemSliding key={voice.id} ref={slidingOptionRef}>
                <IonItemOptions side="end">
                    <IonItemOption color="warning" onClick={startEditVoiceHandler}>
                        <IonIcon slot="icon-only" icon={createSharp}></IonIcon>
                    </IonItemOption>
                    <IonItemOption color="danger" onClick={startDeleteVoiceHandler.bind(null, voice.id)}>
                        <IonIcon slot="icon-only" icon={trashSharp}></IonIcon>
                    </IonItemOption>
                </IonItemOptions>

                <IonItem lines="full"
                        button
                        onClick={playingVoiceHandler}>
                    <IonAvatar slot="start">
                        <img src={voice.image} alt="" />
                    </IonAvatar>
                    <IonLabel>{voice.name}</IonLabel>
                </IonItem>
              </IonItemSliding>
            ))}
          </IonList>
      </IonContent>
    </React.Fragment>
  );
};

export default YourVoiceList;