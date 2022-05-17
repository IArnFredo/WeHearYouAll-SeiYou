import React, { useEffect } from "react";

// export interface Sounds {
//   [key: string]: any;
//   UserID?: any;
// }

export const soundsContext = React.createContext({});
export function useSoundsContext(): any {
  return React.useContext(soundsContext);
}

export const openPlayer = () => ({
  type: "SET_PLAYER_OPEN",
  open: true,
});

export const closePlayer = () => ({
  type: "SET_PLAYER_OPEN",
  open: false,
});

export const pauseTrack = () => ({
  type: "PAUSE",
});

export const playTrack = (track:any) => ({
  type: "PLAY",
  track,
});

export const nextTrack = () => ({
  type: "NEXT",
});

export const prevTrack = () => ({
  type: "PREV",
});

export const favTrack = (track:any) => ({
  type: "FAV",
  track,
});


const logger = (reducer: any) => {
  const reducerWithLogger = (state: any, action: any) => {
    console.log(
      "%cPrevious State:",
      "color: #9E9E9E; font-weight: 700;",
      state
    );
    console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
    console.log(
      "%cNext State:",
      "color: #47B04B; font-weight: 700;",
      reducer(state, action)
    );
    return reducer(state, action);
  };

  return reducerWithLogger;
};

export const getTracks = (state: any) => state.music.tracks;
export const getRecentTracks = (state: any) => state.user.recentTracks;
export const getPlaying = (state: any) => state.playing;
export const getCurrentTrack = (state: any, index: any) =>
  state.music.tracks[state.playing ? state.playing.index : -1];
export const getTrackIndex = (state: any, id: any) =>
  state.music.tracks.findIndex((t: { id: any }) => t.id === id);

export const reducer = (state: any, action: any) => {
  const playing = getPlaying(state);
  const ct = getCurrentTrack(state, playing.index);

  switch (action.type) {
    case "SET_PLAYER_OPEN": {
      return {
        ...state,
        ui: {
          ...state.ui,
          playerOpen: action.open,
        },
      };
    }
    case "PAUSE": {
      return {
        ...state,
        playing: {
          ...playing,
          paused: true,
        },
      };
    }
    case "PLAY": {
      if (action.track && action.track !== ct) {
        const newRecentTracks = getRecentTracks(state).filter(
          (t: { id: any }) => t.id !== action.track.id
        );
        const index = getTrackIndex(state, action.track.id);
        return {
          ...state,
          ui: {
            playerOpen: true,
          },
          playing: {
            ...playing,
            index,
            progress: 0,
            paused: false,
          },
        };
      }
      return {
        ...state,
        playing: {
          ...playing,
          paused: false,
        },
      };
    }
    case "NEXT": {
      return {
        ...state,
        playing: {
          index: (playing.index + 1) % getTracks(state).length,
          progress: 0,
        },
      };
    }
    case "PREV": {
      return {
        ...state,
        playing: {
          index: Math.max(0, state.playing.index - 1),
          progress: 0,
        },
      };

      return state;
    }
  }
};
const loggerReducer = logger(reducer);

// export function useSoundsContext(): Sounds {
//   return React.useContext(soundsContext);
// }

// export function useSounds(): SoundsInit {
//     const db = getFirestore();
//     const [soundsInit, setSoundsInit] = React.useState<SoundsInit>({});
//     const q = collection(db, "sounds");
//     useEffect(() => {
//         async function fetchData() {
//           const querySnapshot = await getDocs(q);
//           const data = querySnapshot.docs.map((doc) => doc.data());
//           setSoundsInit({ sounds: data });
//         }
//         fetchData();
//       }, []);
//     return soundsInit;
// }
