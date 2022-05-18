import {
  IonRow,
  IonAvatar,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonCol,
} from '@ionic/react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSoundsContext } from '../provider/Sounds';
import './Search.css';

export const VOICE_DATA = [
  {
    id: 'v1',
    name: 'Voice1',
    image: 'https://icon-library.com/images/song-icon-png/song-icon-png-13.jpg',
  },
  {
    id: 'v2',
    name: 'Voice2',
    image: 'https://icon-library.com/images/song-icon-png/song-icon-png-13.jpg',
  },
  {
    id: 'v3',
    name: 'Voice3',
    image: 'https://icon-library.com/images/song-icon-png/song-icon-png-13.jpg',
  },
];

const Search: React.FC = () => {
  const db = getFirestore();
  const { state, dispatch } = useSoundsContext();
  const [tracks, setTracks] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const history = useHistory();

  const openVoiceHandler = () => {
    console.log('Edit voice');
    history.push('/playing');
  };

  const fetchUserData = useCallback(async () => {
    const userCollectionRef = collection(db, 'users');
    const querySnapshot = await getDocs(userCollectionRef);
    const userData: any = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    console.log('user data:', userData);
    const musicTracks = state.music.tracks;
    
    console.log('msuic tracks', musicTracks);
    musicTracks.forEach((track: any, trackIdx: number) => {
      const user = userData.find((user: any) => user.id === track.UserID);
      const updatedTrack: any = {
        ...track,
        gender: user?.gender,
        userName: user?.name,
      };
      setTracks(currTracks => {
        currTracks[trackIdx] = updatedTrack;
        return currTracks;
      })
      // setTracks((tracks) => [...tracks, { ...track, gender: user?.gender, userName: user?.name }]);
      console.log('curr user:', user);
      // querySnapshot.forEach((doc) => {
        // if (track.UserID === doc.id) {
          // const trackIdx = musicTracks.findIndex((t: any) => t.UserID === doc.id);
          // console.log('track:', track);
          // setTracks((currTrack) => {
          //   currTrack[trackIdx] = { ...track, gender: doc.data().gender };
          //   return currTrack;
          // });
          // console.log("TEST", track);
          // console.log(doc.id, ' => ', doc.data());
        // }
      // });
    });
    console.log('state tracks:', tracks);
    // console.log('state tracks:', tracks);

    // setTracks(state.music.tracks);
    // console.log(tracks);
  }, [db, state.music.tracks, tracks]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <IonPage>
      <IonContent className='bg-app' id='ion-content-search'>
        <IonRow>
          <IonCol size-sm='8' offset-sm='2' size-md='6' offset-md='3'>
            <IonRow className='search-title'>
              <IonLabel className='ion-margin-vertical'>
                <b>Search</b>
              </IonLabel>
            </IonRow>
            <IonSearchbar
              className='searchBar'
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
              placeholder='Artist, Voices'
            ></IonSearchbar>
            <IonSegment className='segment' value='all'>
              <IonSegmentButton className='segment-btn' value='all'>
                <IonLabel className='segment-label'>All</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton className='segment-btn' value='male'>
                <IonLabel className='segment-label'>Male</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton className='segment-btn' value='female'>
                <IonLabel className='segment-label'>Female</IonLabel>
              </IonSegmentButton>
            </IonSegment>
            <h3 className='ion-margin ion-text-center'>Voices</h3>
            <IonRow>
              <IonCol>
                <IonList className='ion-margin-start ion-margin-end'>
                  {VOICE_DATA.map((voice) => (
                    <IonItem
                      key={voice.id}
                      className='vList item-list-color-search'
                      lines='full'
                      button
                      onClick={openVoiceHandler}
                    >
                      <IonAvatar className='avatar' slot='start'>
                        <img src={voice.image} alt='' />
                      </IonAvatar>
                      <IonLabel className='label'>{voice.name}</IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </IonCol>
            </IonRow>

            <h3 className='ion-margin ion-text-center'>Artists</h3>
            <IonRow id='margin-for-float-btn'>
              <IonCol>
                <IonList className='ion-margin-start ion-margin-end'>
                  {VOICE_DATA.map((voice) => (
                    <IonItem
                      className='vList item-list-color-search'
                      lines='full'
                      button
                      onClick={openVoiceHandler}
                    >
                      <IonAvatar className='avatar' slot='start'>
                        <img src={voice.image} alt='' />
                      </IonAvatar>
                      <IonLabel className='label'>{voice.name}</IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Search);
