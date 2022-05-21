import { Directory, Filesystem } from '@capacitor/filesystem';
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
  IonToolbar,
  useIonActionSheet,
  useIonAlert,
  useIonLoading,
  useIonToast,
  useIonViewDidEnter,
  useIonViewWillEnter
} from '@ionic/react';
import { doc, DocumentData, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useContext, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router';
import { userContext } from '../provider/User';
import './UploadVoice.css';

const UploadVoice: React.FC = () => {
  const db = getFirestore();
  const storage = getStorage();
  const user = useContext(userContext);
  const voiceNameRef = useRef<HTMLIonInputElement>(null);
  const voiceDescRef = useRef<HTMLIonTextareaElement>(null);
  const [recordVoice, setRecordVoice] = React.useState(false);
  const [toast, dismissToast] = useIonToast();
  const [loading, dismissLoading] = useIonLoading();
  const location = useLocation();
  const history = useHistory();
  const [takenSounds, setTakenSounds] = React.useState<{
    id: string,
    path: string | undefined,
    preview: string,
  }>();

  ;
  useIonViewDidEnter(() => {
    const state: any = location.state;
    console.log(state);

    if (state) {
      setTakenSounds({
        id: state.detail.id,
        path: state.detail.path,
        preview: state.detail.preview,
      });
      setRecordVoice(true);
    } else {
      return
    }
  });

  const upload = async () => {
    const enteredName = voiceNameRef.current?.value as string;
    const enteredDesc = voiceDescRef.current?.value as string;
    if (!takenSounds) {
      toast({
        message: 'Please select or record a voice',
        duration: 2000,
      })
      return;
    }
    if (enteredName?.toString().length === 0 || !enteredName) {
      toast({
        message: 'Please enter a name',
        duration: 2000,
      })
      return;
    } if (enteredDesc?.toString().length === 0 || !enteredDesc) {
      toast({
        message: 'Please enter a description',
        duration: 2000,
      })
      return;
    }

    loading({
      message: 'Uploading...',
      spinner: 'crescent',
    });

    const saveData = async (url: string) => {
      try {
        const docRef = doc(db, 'sounds', takenSounds.id);
        await setDoc(docRef, {
          UserID: user.userId,
          id: takenSounds.id,
          name: enteredName,
          description: enteredDesc,
          soundsURL: url,
          uploadTime: new Date().toISOString(),
          userName: user.userData.displayName,
          play: 1,
          images: "https://firebasestorage.googleapis.com/v0/b/seiyou-e9555.appspot.com/o/imagesounds%2Fdedeb100838e24e145964eb9310172f2.jpg?alt=media&token=a75d3384-bbf6-4be2-9874-2c04a27a934a",
        });
        dismissLoading();
        toast({
          message: 'Audio Uploaded',
          duration: 2000,
        });
        setTakenSounds(undefined);
        setRecordVoice(false);
        history.push('/your-voice-list');
      } catch (error) {
        console.log(error);
      }
    }

    const audioFile = await Filesystem.readFile({
      path: takenSounds.path!,
      directory: Directory.Documents,
    });

    const audio = audioFile.data;
    const id = takenSounds.id;
    const byteCharacters = atob(audio);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'audio/mp3' });

    const storageRef = ref(storage, `sounds/${id}.mp3`);
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log(snapshot);
      getDownloadURL(ref(storage, `sounds/${id}.mp3`)).then((url) => {
        saveData(url)
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <IonPage className='bg-app'>
      <IonToolbar>
        <IonButtons slot='start'>
          <IonBackButton defaultHref='/profile' />
        </IonButtons>
        <IonTitle>Upload New Voice</IonTitle>
      </IonToolbar>
      <IonContent className='ion-padding ion-content-uploadvoice'>
        <IonGrid className='ion-text-center' id='margin-for-float-btn-upload'>
          <IonRow>
            <IonCol size='12'>
              <IonButton shape='round' disabled={recordVoice ? true : false} className='select-voice-btn'>Select Voice</IonButton>
            </IonCol>
            <IonCol size='12' className='ion-align-self-center'>
              <IonText>
                <span className='select-voice-status'>{takenSounds ? takenSounds.path : "No voice file selected"}</span>
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
                <IonTextarea ref={voiceDescRef} autoGrow className='voice-desc-textarea' rows={8}></IonTextarea>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton shape='round' className='upload-btn' onClick={() => {
                upload();
              }}>Upload Voice</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(UploadVoice);
