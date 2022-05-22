import { IonBackButton, IonButton, IonButtons, IonContent, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonToast, useIonViewWillEnter } from '@ionic/react'
import React, { useEffect } from 'react'
import './RecordVoice.css';
import { VoiceRecorder } from 'capacitor-voice-recorder';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { useHistory } from 'react-router';

const RecordVoice: React.FC = () => {
  const [recording, setRecording] = React.useState(false);
  const [takenSounds, setTakenSounds] = React.useState<{
    id: string,
    path: string | undefined,
    preview: string,
  }>();
  const [toast, dismissToast] = useIonToast();
  const [disabledSubmitBtn, setDisabledSubmitBtn] = React.useState(false);
  const history = useHistory();


  const checkPermission = async () => {
    VoiceRecorder.hasAudioRecordingPermission().then((result) => {
      if (result.value == false) {
        VoiceRecorder.requestAudioRecordingPermission();
      } else {
        startRecording();
      }
    });
  }



  const startRecording = async () => {
    if (takenSounds) {
      toast({
        message: 'You can only record one sound at a time',
        duration: 2000,
      })
    } else {
      if (recording == true) {
        return;
      }
      setRecording(true);
      VoiceRecorder.startRecording();
      return
    }
  }

  const stopRecording = async () => {
    if (!recording) {
      return;
    }
    VoiceRecorder.stopRecording().then(async (result) => {
      setRecording(false);
      if (result.value && result.value.recordDataBase64) {
        console.log(result);

        const recordData = result.value.recordDataBase64;
        const id = new Date().getTime().toString();
        const fileName = id + '.mp3';

        setTakenSounds({
          id: id,
          path: fileName,
          preview: recordData
        });
        await Filesystem.writeFile({
          path: fileName,
          directory: Directory.Documents,
          data: recordData,
        });
        return
      }
    }
    )
  };



  const getAudio = async () => {
    if (takenSounds) {
      const audioFile = await Filesystem.readFile({
        path: takenSounds.path!,
        directory: Directory.Documents,
      });

      const audio = audioFile.data;
      const audioRef = new Audio(`data:audio/aac;base64,${audio}`);
      audioRef.oncanplaythrough = () => audioRef.play();
      audioRef.load();
    }
  }

  const PlayFile = async () => {
    if (takenSounds) {
      getAudio();
    } else {
      toast({
        message: 'No audio. Please record a sound first.',
        duration: 2000,
      })
    }
  }


  const deleteFile = async () => {
    if (takenSounds) {
      await Filesystem.deleteFile({
        path: takenSounds.path!,
        directory: Directory.Documents,
      });
      setTakenSounds(undefined);
      toast({
        message: 'Audio deleted.',
        duration: 2000,
      })
    } else {
      toast({
        message: 'No audio. Please record a sound first.',
        duration: 2000,
      })
    }
  };

  const Continue = async () => {
    if (!takenSounds) {
      toast({
        message: 'No audio. Please record a sound first.',
        duration: 2000,
      })
    } else {
      history.push({
        pathname: '/upload-voice',
        state: { detail: takenSounds! }
      });
    }
  }

  return (
    <IonPage>
      <IonToolbar className='tool'>
        <IonButtons slot='start'>
          <IonBackButton defaultHref='/profile'></IonBackButton>
          <IonText>Record Your Voice</IonText>
        </IonButtons>
      </IonToolbar>
      <IonContent className='rcContent ion-text-center' fullscreen>
        <IonButton className='recButton' color='danger' onClick={!recording ? checkPermission : stopRecording}>
          <img src="../assets/images/recButton.png" alt="" />
        </IonButton><br />
        {recording ? <IonText>Recording... Press again to stop</IonText> : <IonText>Press to record</IonText>}<br />
        <IonButton className='playButton' color='primary' onClick={PlayFile}>
          <img src="../assets/images/playButton.png" alt="" />
        </IonButton>
        <IonRow className='ion-justify-content-center ion-margin-top'>
          <IonButton id='rec-Button' className='buttonSize' shape='round' onClick={deleteFile}>Delete</IonButton>
        </IonRow>
        <IonRow className='ion-justify-content-center'>
          <IonButton id='rec-Button' shape='round' disabled={disabledSubmitBtn} onClick={Continue}>Continue</IonButton>
        </IonRow>
      </IonContent>
    </IonPage>
  )
}

export default React.memo(RecordVoice);