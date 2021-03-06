import { MusicControls } from '@awesome-cordova-plugins/music-controls/';
import { IonCol, IonRow, IonToolbar } from "@ionic/react";
import { updateProfile } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from "react";
import { default as AudioPlayer, default as H5AudioPlayer } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useLocation, withRouter } from "react-router";
import { getPlaying, getTracks, nextTrack, openPlayer, pauseTrack, playTrack, prevTrack, useSoundsContext } from "../provider/Sounds";
import "./Playing.css";
import "./SoundPlayer.css";

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
  const db = getFirestore();
  const [top, setTop] = useState(0);
  const [disable, setDisable] = useState(false);
  const Changer = document.getElementById("classChanger")!;
  const ToolbarPlaying = document.getElementById("toolbar-playing")!;

  const { state, dispatch } = useSoundsContext();
  const trackSounds = getTracks(state);
  const track = trackSounds[state.playing.index];
  const playing = getPlaying(state);
  const mediaplayer = useRef<H5AudioPlayer>(null);
  const musicControls = MusicControls;
  const text = document.getElementsByClassName("rhap_header")[0];
  const location = useLocation().pathname;
  
  if (text) {
    text.addEventListener("click", e => {
      if (state.ui.initiate == true) {
        dispatch(openPlayer())
      } else {

      }
    })
  }

  const mediamusicControls = () => {
    if (track) {
      musicControls.create({
        track: track.name,        // optional, default : ''
        artist: track.userName,                       // optional, default : ''
        cover: track.images,      // optional, default : nothing
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
        // optional, default: 0
        elapsed: 10, // optional, default: 0
        hasSkipForward: false,  // show skip forward button, optional, default: false
        hasSkipBackward: false, // show skip backward button, optional, default: false
        skipForwardInterval: 15, // display number for skip forward, optional, default: 0
        skipBackwardInterval: 15, // display number for skip backward, optional, default: 0
        hasScrubbing: true, // enable scrubbing from control center and lockscreen progress bar, optional

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
      musicControls.updateIsPlaying(false);
      setDisable(true);
    }
    if (location === "/login") {
      musicControls.updateIsPlaying(false);
      setDisable(true);
    }
    else if (location === "/profile") {
      setDisable(false);
      if (Changer != null) {
        Changer.style.left = "0px"
      }
    }
    if (location === "/register") {
      musicControls.updateIsPlaying(false);
      setDisable(true);
    }
    if (location === "/home") {
      setDisable(false);
    }
    if (location === "/record-voice") {
      setDisable(true);
    }
    if (location === "/upload-voice") {
      setDisable(false);
    }
    if (location.toLowerCase().includes("/chat")) {
      if (Changer != null) {
        Changer.style.left = "-999px"
      }
    }
    if (location.toLowerCase().includes("/another-profile")) {
      Changer.style.left = "0px"
    }
    if (location === "/edit-profile") {
      Changer.style.left = "-999px"
    }
    if (location === "/playing") {
      if (ToolbarPlaying != null) {
        Changer.style.left = "0px"
        Changer.style.bottom = "0px"
        if (state.ui.initiate == true) {
          text.classList.add("hide");
        }
      }
    }
    else {
      if (ToolbarPlaying != null) {
        // Changer.style.left = "0px"
        Changer.style.bottom = "57px";
        ToolbarPlaying.classList.remove("ion-notoolbar-playing");
        text.classList.remove("hide");
      }
      return;
    }
    return
  }, [location]);

  const PlusPlay = async () => {
    const docRef = doc(db, 'sounds', track.id);
    try {
      await setDoc(docRef, {
        ...track,
        play: track.play + 1
      });
      return
    } catch (error) {
      console.error(error);
    }
  }


  if (!playing) {
    return null;
  }
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
          <IonToolbar id="toolbar-playing" >
            <IonRow>
              <IonCol size="12" className="ion-text-justify">
                <AudioPlayer
                  header={state.ui.initiate == true ? track.name : "No sound playing"}{...state.ui.playerOpen == true ? track.name : null}
                  ref={mediaplayer}
                  customVolumeControls={[]}
                  showSkipControls={true}
                  autoPlayAfterSrcChange={true}
                  showJumpControls={false}
                  autoPlay={false}
                  layout="horizontal"
                  src={state.ui.initiate == true ? track.soundsURL : null}
                  onPlay={() => { { mediamusicControls(); musicControls.updateIsPlaying(true) } }}
                  // onPlaying={() => { musicControls.updateIsPlaying(true) }}
                  onPause={() => { musicControls.updateIsPlaying(false) }}
                  onPlaying={() => { PlusPlay() }}
                  onClickPrevious={() => dispatch(prevTrack())}
                  onClickNext={() => dispatch(nextTrack())}
                ></AudioPlayer>
              </IonCol>
            </IonRow>
          </IonToolbar>

        </div>
      )}
    </>
  );
};


export default withRouter(SoundPlayer);
