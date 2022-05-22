import { Chooser } from '@awesome-cordova-plugins/chooser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid, IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar, useIonLoading,
  useIonToast,
  useIonViewDidEnter,
  useIonViewWillLeave
} from '@ionic/react';
import { doc, getFirestore, setDoc, Timestamp } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useContext, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { userContext } from '../provider/User';
import './EditProfile.css';
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
  const from = useLocation().state;
  const [, setSelectedFile] = useState<File>();

  

  const [takenPhoto, setTakenPhoto] = useState<{
    path: string | undefined,
    preview: string,
  }>();

  const [takenSounds, setTakenSounds] = React.useState<{
    id: string,
    path: string | undefined,
    preview: string | Uint8Array,
  }>();

  useIonViewWillLeave(()=>{
    setRecordVoice(false);
    setTakenSounds(undefined);
  })

  
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
      setRecordVoice(false);
      return
    }
    return
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

    const saveData = async (url: string, urlPhoto: string) => {
      try {
        const docRef = doc(db, 'sounds', takenSounds.id);
        await setDoc(docRef, {
          UserID: user.userId,
          id: takenSounds.id,
          name: enteredName,
          description: enteredDesc,
          soundsURL: url,
          uploadTime: Timestamp.fromDate(new Date()),
          userName: user.userData.displayName,
          play: 1,
          images: urlPhoto != '' ? urlPhoto : 'https://firebasestorage.googleapis.com/v0/b/seiyou-e9555.appspot.com/o/imagesounds%2Fdedeb100838e24e145964eb9310172f2.jpg?alt=media&token=a75d3384-bbf6-4be2-9874-2c04a27a934a',
        });
        dismissLoading();
        toast({
          message: 'Audio Uploaded',
          duration: 1000,
        });
        setTakenSounds(undefined);
        setRecordVoice(false);
        history.push('/your-voice-list', { state: { from: location } });
      } catch (error) {
        console.log(error);
      }
    }
    if (recordVoice != true) {
      if (takenSounds) {
        const id = takenSounds.id;
        // const byteNumbers = new Array(takenSounds.preview.length);
        // for (let i = 0; i < takenSounds.preview.length; i++) {
        //   byteNumbers[i] = takenSounds.preview.charCodeAt(i);
        // }
        // const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([takenSounds.preview], { type: 'audio/mp3' });
        console.log(blob);
        if (takenPhoto) {
          const photoBlob = await fetch(takenPhoto.preview).then(res => res.blob());
          const storageRef = ref(storage, `imagesounds/${id}.jpg`);
          uploadBytes(storageRef, photoBlob).then((snapshot) => {
            console.log('photo uploaded', snapshot);
            getDownloadURL(ref(storage, `imagesounds/${id}.jpg`)).then((photoUrl) => {
              // const byteArray = new Uint8Array(takenSounds.preview);
              const blob = new Blob([takenSounds.preview], { type: 'audio/mp3' });
              const storageRef = ref(storage, `sounds/${id}.mp3`);
              uploadBytes(storageRef, blob).then((snapshot) => {
                console.log(snapshot);
                getDownloadURL(ref(storage, `sounds/${id}.mp3`)).then((url) => {
                  saveData(url, photoUrl);
                }).catch((error) => {
                  console.log(error);
                });
              }).catch((error) => {
                console.log(error);
              });
            }).catch((err) => console.error(err));
          });
        } else {
          const storageRef = ref(storage, `sounds/${id}.mp3`);
          uploadBytes(storageRef, blob).then((snapshot) => {
            getDownloadURL(ref(storage, `sounds/${id}.mp3`)).then((url) => {
              saveData(url, '');
            }).catch((error) => {
              console.log(error);
            });
          }).catch((error) => {
            console.log(error);
          });
        }
      }

    } else {
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

      if (takenPhoto) {
        const photoBlob = await fetch(takenPhoto.preview).then(res => res.blob());
        const storageRef = ref(storage, `imagesounds/${id}.jpg`);
        uploadBytes(storageRef, photoBlob).then((snapshot) => {
          console.log('photo uploaded', snapshot);
          getDownloadURL(ref(storage, `imagesounds/${id}.jpg`)).then((photoUrl) => {
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'audio/mp3' });
            const storageRef = ref(storage, `sounds/${id}.mp3`);
            uploadBytes(storageRef, blob).then((snapshot) => {
              console.log(snapshot);
              getDownloadURL(ref(storage, `sounds/${id}.mp3`)).then((url) => {
                saveData(url, photoUrl);
              }).catch((error) => {
                console.log(error);
              });
            }).catch((error) => {
              console.log(error);
            });
          }).catch((err) => console.error(err));
        });
      }
      else {
        const storageRef = ref(storage, `sounds/${id}.mp3`);
        uploadBytes(storageRef, blob).then((snapshot) => {
          console.log(snapshot);
          getDownloadURL(ref(storage, `sounds/${id}.mp3`)).then((url) => {
            saveData(url, '');
          }).catch((error) => {
            console.log(error);
          });
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  }

  const selectCoverImage = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
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
  }

  const selectVoice = async () => {
    const file = await Chooser.getFile("audio/*");
    const id = new Date().getTime().toString();
    if (file) {
      setTakenSounds({
        id: id,
        path: file.name,
        preview: file.data!,
      })
    }
    console.log(file ? file : 'canceled');
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
              <IonButton shape='round' disabled={recordVoice ? true : false} onClick={selectVoice} className='select-voice-btn'>Select Voice</IonButton>
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
          <IonRow className='ion-margin-top'>
            <IonLabel position='stacked' color='dark'>
              <span className='voice-cover-image-label'>Voice Cover Image</span>
            </IonLabel>
            <IonCol size='12'>
              <IonButton shape='round' className='cover-image-button' onClick={selectCoverImage}>Select Cover Image</IonButton>
              {takenPhoto ? (
                <img
                  src={takenPhoto!.preview}
                  className="radius-pic-edit-profile"
                  alt="profile"
                  onClick={selectCoverImage}
                />
              ) : (
                <img
                  src={'https://firebasestorage.googleapis.com/v0/b/seiyou-e9555.appspot.com/o/imagesounds%2Fdedeb100838e24e145964eb9310172f2.jpg?alt=media&token=a75d3384-bbf6-4be2-9874-2c04a27a934a'}
                  className="radius-pic-edit-profile"
                  alt="profile"
                  onClick={selectCoverImage}
                />
              )}
            </IonCol>
          </IonRow>
          <IonRow className='ion-margin-top'>
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
