import React, { useEffect, useRef, useState } from "react";
import "./Playing.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { IonButton, IonCol, IonContent, IonFab, IonFooter, IonItem, IonPage, IonRow, IonToolbar } from "@ionic/react";
import { useLocation, useParams } from "react-router";
import "./SoundPlayer.css";
import { useSoundsContext, getTracks, nextTrack, prevTrack, playTrack, pauseTrack } from "../provider/Sounds";
import Home from "./Home";
import { MusicControls } from '@awesome-cordova-plugins/music-controls/';
import H5AudioPlayer from "react-h5-audio-player";

// const media = Media;
// const fileMusic = media.create('https://firebasestorage.googleapis.com/v0/b/seiyou-e9555.appspot.com/o/owari.mp3?alt=media&token=b48d2294-717d-438e-998e-961ade0dfd9a');
// fileMusic.seekTo(1);

const waitForElement = (sel: any, cb: any) => {
  const el = document.querySelector(sel);

  if (!el || !el.offsetHeight) {
    requestAnimationFrame(() => waitForElement(sel, cb));
  } else {
    cb(el);
  }
}

const SoundPlayer: React.FC = () => {
  const [top, setTop] = useState(0);
  const [disable, setDisable] = useState(false);
  const Changer = document.getElementById("classChanger")!;
  const { state, dispatch } = useSoundsContext();
  const trackSounds = getTracks(state);
  const track = trackSounds[state.playing.index];

  const mediaplayer = useRef<H5AudioPlayer>(null);

  const musicControls = MusicControls;

  const mediamusicControls = () => {
    if (track) {
      musicControls.create({
        track: track.name,        // optional, default : ''
        artist: 'Muse',                       // optional, default : ''
        cover: 'albums/absolution.jpg',      // optional, default : nothing
        // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
        //           or a remote url ('http://...', 'https://...', 'ftp://...')
        isPlaying: false,                         // optional, default : true
        dismissable: true,                         // optional, default : false

        // hide previous/next/close buttons:
        hasPrev: true,      // show previous button, optional, default: true
        hasNext: true,      // show next button, optional, default: true
        hasClose: false,       // show close button, optional, default: false

        // iOS only, optional
        album: 'Absolution',     // optional, default: ''
        duration: 60, // optional, default: 0
        elapsed: 10, // optional, default: 0
        hasSkipForward: true,  // show skip forward button, optional, default: false
        hasSkipBackward: true, // show skip backward button, optional, default: false
        skipForwardInterval: 15, // display number for skip forward, optional, default: 0
        skipBackwardInterval: 15, // display number for skip backward, optional, default: 0
        hasScrubbing: false, // enable scrubbing from control center and lockscreen progress bar, optional

        // Android only, optional
        // text displayed in the status bar when the notification (and the ticker) are updated, optional
        ticker: 'Now playing "Time is Running Out"',
        // All icons default to their built-in android equivalents
        playIcon: 'media_play',
        pauseIcon: 'media_pause',
        prevIcon: 'media_prev',
        nextIcon: 'media_next',
        closeIcon: 'media_close',
        notificationIcon: 'notification'
      });

      musicControls.subscribe().subscribe(action => {
        events(action);
        function events(action: any) {
          const message = JSON.parse(action).message;
          console.log(message);
          switch (message) {
            case 'music-controls-next':
              musicControls.updateIsPlaying(true);
              dispatch(nextTrack())
              break;
            case 'music-controls-previous':
              musicControls.updateIsPlaying(true);
              dispatch(prevTrack())
              break;
            case 'music-controls-pause':
              musicControls.updateIsPlaying(false);
              dispatch(pauseTrack());
              mediaplayer.current!.audio.current!.pause()
              break;
            case 'music-controls-play':
              dispatch(playTrack(track))
              musicControls.updateIsPlaying(true);
              mediaplayer.current!.audio.current!.play()
              break;
            case 'music-controls-destroy':
              // Do something
              break;

            // External controls (iOS only)
            case 'music-controls-toggle-play-pause':
              // Do something
              break;
            case 'music-controls-seek-to':
              const seekToInSeconds = JSON.parse(action).position;
              musicControls.updateElapsed({
                elapsed: seekToInSeconds,
                isPlaying: true
              });
              // Do something
              break;
            case 'music-controls-skip-forward':
              break;
            case 'music-controls-skip-backward':
              // Do something
              break;

            // Headset events (Android only)
            // All media button events are listed below
            case 'music-controls-media-button':
              // Do something
              break;
            case 'music-controls-headset-unplugged':
              // Do something
              break;
            case 'music-controls-headset-plugged':
              // Do something
              break;
            default:
              break;
          }
        }
      });
      musicControls.listen();
    }
  }



  // let file : MediaObject = Media.create("https://firebasestorage.googleapis.com/v0/b/seiyou-e9555.appspot.com/o/sounds%2Fowari.mp3?alt=media&token=b90b0880-677f-4271-9e90-b2dc550ddcdb");
  // console.log(track);
  // if (track) {
  //   file = Media.create(track.soundsURL);
  //   file.onSuccess.subscribe(() => console.log('Action is successful'));
  //   file.onError.subscribe((error: any) => console.log('Error!', error));
  //   console.log(file);
  // }

  const location = useLocation().pathname;



  useEffect(() => {
    waitForElement('ion-tab-bar', (tabBar: any) => {
      if (tabBar) {
        const box = tabBar.getBoundingClientRect();
        setTop(window.innerHeight - box.top);
      }
      else {
        setTop(0);
      }
    })
    if (location === "/welcome") {
      setDisable(true);
    }
    if (location === "/login") {
      setDisable(true);
    }
    if (location === "/register") {
      setDisable(true);
    }
    if (location === "/home") {
      setDisable(false);
    }  if (location === "/edit-profile") {
      Changer.style.left = "-999px"
    } else if (location === "/profile" && disable === false) {
      Changer.style.left = "0px"
    } else{
      return
    }
    return
  }, [location]);
  if (!track) return null;

  return (
    <>
      {disable == true && (
        null
      )}
      {disable == false && (
        <div id="classChanger" style={{
          position: 'fixed',
          width: '100%',
          zIndex: '1000',
          bottom: `${top}px`,
        }} className="false">
          <IonFooter>
            <IonToolbar>
              <IonRow>
                <IonCol size="12" className="ion-text-justify">
                  <AudioPlayer
                    ref={mediaplayer}
                    showSkipControls={true}
                    autoPlayAfterSrcChange={true}
                    showJumpControls={false}
                    autoPlay={false}
                    layout="horizontal"
                    src={track.soundsURL}
                    onPlay={() => { mediamusicControls() }}
                    onPlaying={() => { musicControls.updateIsPlaying(true) }}
                    onEnded={() => dispatch(nextTrack())}
                    onClickPrevious={() => dispatch(prevTrack())}
                    onClickNext={() => dispatch(nextTrack())}
                  />
                </IonCol>
              </IonRow>
            </IonToolbar>
          </IonFooter>
        </div>
      )}

    </>
  );
};
export default React.memo(SoundPlayer);
