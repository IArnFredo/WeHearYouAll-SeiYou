import React from "react";
import "./Playing.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { IonFab, IonItem } from "@ionic/react";

// const media = Media;
// const fileMusic = media.create('https://firebasestorage.googleapis.com/v0/b/seiyou-e9555.appspot.com/o/owari.mp3?alt=media&token=b48d2294-717d-438e-998e-961ade0dfd9a');
// fileMusic.seekTo(1);
const SoundPlayer: React.FC = () => {
  // const PlayVoice = () => {
  //   // fileMusic.play();
  //   setPlaying(true);
  //   console.log("play");
  // }

  // const PauseVoice = () => {
  //   // fileMusic.pause();
  //   setPlaying(false);
  //   console.log("pause");
  // }
  return (
    <IonFab className="float-btn" vertical="bottom" slot="fixed">
      <IonItem className="home-float-btn ion-margin-horizontal" button detail={false}>
        <AudioPlayer
          // autoPlay={true}
          src="https://firebasestorage.googleapis.com/v0/b/seiyou-e9555.appspot.com/o/owari.mp3?alt=media&token=b48d2294-717d-438e-998e-961ade0dfd9a"
          onPlay={e => console.log("onPlay")}
        // other props here
        />
      </IonItem>
    </IonFab>
  );
};

export default SoundPlayer;
