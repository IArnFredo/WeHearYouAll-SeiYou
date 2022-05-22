import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
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
  IonToolbar,
  useIonLoading,
  useIonToast
} from '@ionic/react';
import { onSnapshot, query, collection, where, getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { pencilOutline } from 'ionicons/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSoundsContext } from '../provider/Sounds';
import { userContext } from '../provider/User';
import './EditVoice.css';

const EditVoice: React.FC = () => {
  const db = getFirestore();
  const user = useContext(userContext);
  const { state, dispatch } = useSoundsContext();
  const voiceNameRef = useRef<HTMLIonInputElement>(null);
  const descText = useRef<HTMLIonTextareaElement>(null);
  const [voices, setVoices] = useState<Array<any>>();
  const [loading, dismissLoading] = useIonLoading();
  const [presentToast, dismissToast] = useIonToast();
  const storage = getStorage();
  const [voiceId, setVoiceId] = useState<string>();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const history = useHistory();

  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(false);
  const [takenPhoto, setTakenPhoto] = useState<{
    path: string | undefined,
    preview: string,
  }>();
  const [, setSelectedFile] = useState<File>();


  useEffect(() => {
    setVoiceId(localStorage.getItem('voiceID')!);
    const voiceRef = localStorage.getItem('voiceID')!;
    onSnapshot(query(collection(db, "sounds"), where("id", "==", voiceRef)), (querySnapshot) => {
      const data = (querySnapshot.docs.map((doc) => doc.data()))
      setVoices(data);
      setName(data[0].name);
      setDesc(data[0].description);
    }
    )

    return
  }, [])

  const saveUpdate = async (photoUrl: string) => {
    const docRef = doc(db, 'sounds', voiceId!);
    try {
      await setDoc(docRef, {
        UserID: voices![0].UserID,
        description: desc,
        name: name,
        gender: voices![0].gender,
        id: voices![0].id,
        play: voices![0].play,
        soundsURL: voices![0].soundsURL,
        uploadTime: voices![0].uploadTime,
        userName: voices![0].userName,
        images: photoUrl !== '' ? photoUrl : voices![0].images,
      });
      presentToast({
        message: 'Your profile has been updated!',
        buttons: [{ text: 'hide', handler: () => dismissToast() }],
        duration: 3000,
      });
      history.push('/your-voice-list');
    } catch (error) {
      dismissLoading();
      console.error(error);
    }
  }

  const choosePicture = async () => {
    await Camera.checkPermissions().then((result) => {
      if (result.camera == "granted" && result.photos == "granted") {
        getPicture();
      }
      else {
        Camera.requestPermissions();
      }
    }
    );
  };

  const getPicture = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 80,
      width: 500
    });

    const response = await fetch(photo.webPath!);
    const bin = await response.blob();
    setSelectedFile(bin as File);

    if (!photo || !photo.webPath) {
      return;
    }

    setTakenPhoto({
      path: photo.path,
      preview: photo.webPath,
    });
  };

  const updateHandler = async () => {
    loading({
      message: 'Updating...',
      spinner: 'crescent',
      duration: 4000,
    })
    setDisabledSubmitBtn(true);
    if (!voiceNameRef || voiceNameRef.toString().trim().length === 0 || !descText || descText.toString().trim().length === 0) {
      setDisabledSubmitBtn(false);
      return;
    }

    if (takenPhoto) {
      const photoName = voiceId + '.jpeg';
      const photoBlob = await fetch(takenPhoto.preview).then(res => res.blob());
      // store image in firebase storage
      const storageRef = ref(storage, `imagesounds/${photoName}`);
      uploadBytes(storageRef, photoBlob).then((snapshot) => {
        getDownloadURL(ref(storage, `imagesounds/${photoName}`)).then((photoUrl) => {
          // add memory to firestore
          saveUpdate(photoUrl);
        }).catch((err) => console.error(err));
      });
    } else {
      saveUpdate('');
    }
  };

  if (user.loggedIn === false) {
    return <Redirect to="/login" />;
  }
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
            {voices != undefined && (
              <IonCol size="12" className="ion-text-center edit-image-profile">
                {takenPhoto ? (
                  <img
                    src={takenPhoto.preview}
                    className="radius-pic-edit-profile"
                    alt="profile"
                    onClick={choosePicture}
                  />
                ) : (
                  <img
                    src={voices[0].images}
                    className="radius-pic-edit-profile"
                    alt="profile"
                    onClick={choosePicture}
                  />
                )}
                <div className="centered-title-edit" onClick={choosePicture}>
                  <IonIcon
                    className="pencil"
                    size="small"
                    color="dark"
                    icon={pencilOutline}
                  ></IonIcon>
                </div>
              </IonCol>
            )}
          </IonRow>
          <IonRow>
            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
              <IonItem className='voice-name'>
                <IonInput autofocus ref={voiceNameRef} value={name} onIonChange={e => setName(e.detail.value!)}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
              <IonItem lines='none'>
                <IonLabel position='stacked' color='dark'>
                  <span className='voice-desc-label'>Voice Description</span>
                </IonLabel>
                <IonTextarea autoGrow ref={descText} onIonChange={e => setDesc(e.detail.value!)} className='voice-desc-textarea' value={desc} rows={8}></IonTextarea>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
              <IonButton shape='round' onClick={updateHandler} className='upload-btn'>Update Voice</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(EditVoice);
