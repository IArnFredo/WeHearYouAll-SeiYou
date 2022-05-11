import { IonButtons, IonBackButton, IonContent, IonList, IonAvatar, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonAlert, IonToast, IonToolbar, IonText, IonPage, IonRow, IonCol } from '@ionic/react';
import { trashSharp, createSharp } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import './YourVoiceList.css';

export const VOICE_DATA = [
    {id: 'd1', name: 'Alvin', image: 'http://cdn.onlinewebfonts.com/svg/img_258083.png'},
    {id: 'd2', name: 'Martin', image: 'http://cdn.onlinewebfonts.com/svg/img_258083.png'},
    {id: 'd3', name: 'Djong', image: 'http://cdn.onlinewebfonts.com/svg/img_258083.png'}
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
    <IonPage className='bg-app'>
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
      <IonToolbar class="ion-toolbar-yourvoice">
        <IonButtons slot="start">
            <IonBackButton defaultHref="/@profile"/>
        </IonButtons>
        <IonText class="ion-margin">Your Voices</IonText>
      </IonToolbar>
      <IonContent class='ion-content-yourvoice'>
        <IonRow>
          <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
          <h3 className="ion-margin ion-text-center">Voices</h3>
          <IonList>
            {VOICE_DATA.map(voice => (
              <IonItemSliding key={voice.id} ref={slidingOptionRef}>
                <IonItemOptions side="end">
                    <IonItemOption className="sliding" color="warning" onClick={startEditVoiceHandler}>
                        <IonIcon slot="icon-only" icon={createSharp}></IonIcon>
                    </IonItemOption>
                    <IonItemOption className="sliding" color="danger" onClick={startDeleteVoiceHandler.bind(null, voice.id)}>
                        <IonIcon slot="icon-only" icon={trashSharp}></IonIcon>
                    </IonItemOption>
                </IonItemOptions>

                <IonItem className="list item-list-color-yourvoice " lines="full"
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
          </IonCol>
        </IonRow>
          
      </IonContent>
    </IonPage>
  );
};

export default YourVoiceList;