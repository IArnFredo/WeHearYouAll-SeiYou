import { IonButtons, IonBackButton, IonContent, IonList, IonAvatar, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonAlert, IonToast, IonToolbar, IonText, IonPage, IonRow, IonCol, useIonLoading, IonButton, IonTitle } from '@ionic/react';
import { trashSharp, createSharp, arrowBackCircle, arrowBackOutline } from 'ionicons/icons';
import React, { useCallback, useContext, useEffect } from 'react';
import { useRef, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router';
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import './YourVoiceList.css';
import { userContext } from '../provider/User';
import { isPlayerOpen, playTrack, useSoundsContext } from '../provider/Sounds';
import { deleteObject, getStorage, ref, StringFormat } from 'firebase/storage';
import { exit } from 'process';


const YourVoiceList = (props: any) => {
  const [toastMessage, setToastMessage] = useState('');
  const [startDeleting, setStartDeleting] = useState(false);
  const slidingOptionRef = useRef<HTMLIonItemSlidingElement>(null);
  const [voiceID, setVoiceID] = useState('');
  const history = useHistory();
  const user = useContext(userContext);
  const from = useLocation().state;
  const [voices, setVoices] = useState<Array<any>>([])!;
  const db = getFirestore();
  const storage = getStorage();
  const { state, dispatch } = useSoundsContext();
  const open = isPlayerOpen(state);
  const [loading, dismissLoading] = useIonLoading();

  useEffect(() => {
    if (user != undefined) {
      onSnapshot(query(collection(db, "sounds"), where("UserID", "==", user.userId)), (querySnapshot) =>
        setVoices(querySnapshot.docs.map((doc) => doc.data()))
      )
      return;
    } else {
      setVoices([]);
    }
    return;
  }, [])

  const startEditVoiceHandler = (voice: any) => {
    localStorage.setItem('voiceID', voice);
    slidingOptionRef.current?.closeOpened();
    history.push('/edit-voice');
  };

  const startDeleteVoiceHandler = (voice: any) => {
    setVoiceID(voice);
    slidingOptionRef.current?.closeOpened();
    setStartDeleting(true);
  };

  function deleteVoiceHandler() {
    loading({
      message: 'Deleting voice...',
      spinner: 'crescent',
      duration: 300,
    })
    async function fetchData() {
      await deleteDoc(doc(db, "sounds", voiceID));
      const soundsRef = ref(storage, 'sounds' + '/' + voiceID + '.mp3');

      // Delete the file
      deleteObject(soundsRef).then(() => {

      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
      setStartDeleting(false);
      setToastMessage("Deleted voices");
      return
    }
    localStorage.removeItem('voiceID');
    fetchData();
    dismissLoading();
  };

  const playingVoiceHandler = useCallback(sound => {
    dispatch(playTrack(sound));
  }, []);

  if (open == true) {
    return <Redirect to={'/playing'} />
  }


  return (
    <IonPage className='bg-app'>
      <IonAlert isOpen={startDeleting}
        header="Are you sure?"
        message="Do you want to delete your Voice? This cannot be undone."
        buttons={[
          { text: 'No', role: 'cancel', handler: () => { setStartDeleting(false) } },
          { text: 'Yes', handler: (e) => deleteVoiceHandler() }
        ]} />
      <IonToast isOpen={!!toastMessage}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => { setToastMessage('') }} />
      <IonToolbar class="ion-toolbar-yourvoice ion-margin-top">
        <IonButtons slot="start">
          <IonButton routerLink='/profile'>
            <IonIcon size='large' icon={arrowBackOutline}></IonIcon>
          </IonButton>
        </IonButtons>
        <IonTitle>Your Voices</IonTitle>
      </IonToolbar>
      <IonContent class='ion-content-yourvoice'>
        <IonRow>
          <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
            <h3 className="ion-margin ion-text-center">Voices</h3>
            <IonList>
              {voices.length == 0 && (
                <IonTitle>
                  User has no voices
                </IonTitle>
              )}

              {voices.map((voice: any, index: any) => (
                <IonItemSliding key={index} ref={slidingOptionRef}>
                  <IonItemOptions side="end">
                    <IonItemOption expandable className="sliding" color="warning" onClick={startEditVoiceHandler.bind(null, voice.id)}>
                      <IonIcon slot="icon-only" icon={createSharp}></IonIcon>
                    </IonItemOption>
                    <IonItemOption className="sliding" color="danger" onClick={startDeleteVoiceHandler.bind(null, voice.id)}>
                      <IonIcon slot="icon-only" icon={trashSharp}></IonIcon>
                    </IonItemOption>
                  </IonItemOptions>
                  <IonItem className="list item-list-color-yourvoice " lines="full"
                    button
                    onClick={() => playingVoiceHandler(voice)}>
                    <IonAvatar slot="start">
                      <img src={voice.images} alt="" />
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

export default React.memo(YourVoiceList);