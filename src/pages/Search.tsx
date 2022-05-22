/* eslint-disable react-hooks/exhaustive-deps */
import {
  IonAvatar, IonCol, IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage, IonRow, IonSearchbar,
  IonSegment,
  IonSegmentButton
} from '@ionic/react';
import { collection, DocumentData, getDocs, getFirestore } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { playTrack, useSoundsContext } from '../provider/Sounds';
import './Search.css';

interface TrackTypes {
  id: string;
  UserID: string;
  images: string;
  name: string;
  play: number;
  soundsURL: string;
  uploadTime: string;
  userName?: string;
  gender?: string;
};

const Search: React.FC = () => {
  const db = getFirestore();
  const { state, dispatch } = useSoundsContext();
  const [tracks, setTracks] = useState<TrackTypes[]>([]);
  const [usersData, setUsersData] = useState<DocumentData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchGender, setSearchGender] = useState('all');

  const playVoiceHandler = useCallback((voice) => {
    dispatch(playTrack(voice));
  }, []);

  const fetchData = useCallback(async () => {
    const userCollectionRef = collection(db, 'users');
    const querySnapshot = await getDocs(userCollectionRef);

    // set state
    setUsersData(querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    }));
    setTracks(state.music.tracks);

    // append necessary user data to track
    tracks.forEach((track: TrackTypes, trackIdx: number) => {
      const userData = usersData.find((user: DocumentData) => user.id === track.UserID);
      const updatedTrack: TrackTypes = { ...track, gender: userData!.gender, userName: userData!.name };
      setTracks(currTracks => {
        currTracks[trackIdx] = updatedTrack;
        return currTracks;
      });
    });
  }, [db, state.music.tracks, tracks]);

  const searchVoiceHandler = () => {
    if (searchGender === 'all') {
      return tracks.filter((track: TrackTypes) => (
        track.name.toLowerCase().includes(searchText.toLowerCase())
      ));
    }
    return tracks.filter((track: TrackTypes) => (
      track.name.toLowerCase().includes(searchText.toLowerCase()) &&
      track.gender!.toLowerCase() === searchGender.toLowerCase()
    ));
  };

  const searchUserHandler = () => {
    if (searchGender === 'all') {
      return usersData.filter((user: DocumentData) => (
        user.name.toLowerCase().includes(searchText.toLowerCase())
      ));
    }
    return usersData.filter((user: DocumentData) => (
      user.name.toLowerCase().includes(searchText.toLowerCase()) &&
      user.gender.toLowerCase() === searchGender.toLowerCase()
    ));
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <IonPage>
      <IonContent className='bg-app fixed-nav' id='ion-content-search'>
        <IonRow>
          <IonCol size-sm='8' offset-sm='2' size-md='6' offset-md='3'>

              <IonRow className='search-title ion-margin-top'>
                <IonLabel className='ion-margin-vertical ion-margin-horizontal'>
                  <b>Search</b>
                </IonLabel>
              </IonRow>

              <IonSearchbar
                className='searchBar'
                value={searchText}
                onIonChange={(e) => setSearchText(e.detail.value!)}
                placeholder='Artist, Voices'
              ></IonSearchbar>

              <IonSegment className='segment' value={searchGender} onIonChange={(e) => setSearchGender(e.detail.value!)}>
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

          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size-sm='8' offset-sm='2' size-md='6' offset-md='3'>

            {/* Version 1. Show all voices & users if search text is empty */}
            <h3 className='ion-margin ion-text-center'>Voices</h3>
            <IonRow>
              <IonCol>
                <IonList className='ion-margin-start ion-margin-end'>
                  {searchVoiceHandler().map((voice) => (
                    <IonItem
                      key={voice.id}
                      className='voices-vList item-list-color-search'
                      lines='full'
                      button
                      onClick={() => playVoiceHandler(voice)}
                    >
                      <IonAvatar className='avatar' slot='start'>
                        <img src={voice.images} alt={voice.name} />
                      </IonAvatar>
                      <IonLabel className='label'>{voice.name}</IonLabel>
                    </IonItem>
                  ))}
                  {searchVoiceHandler().length === 0 && (
                    <p>No voice found.</p>
                  )}
                </IonList>
              </IonCol>
            </IonRow>

            <h3 className='ion-margin ion-text-center'>Artists</h3>
            <IonRow id='margin-for-float-btn-search'>
              <IonCol>
                <IonList className='ion-margin-start ion-margin-end'>
                  {searchUserHandler().map((user) => (
                    <IonItem
                      key={user.id}
                      className='artist-vList artist item-list-color-search'
                      lines='full'
                      button
                      routerLink={`/another-profile/${user.id}`}
                    >
                      <IonAvatar className='avatar' slot='start'>
                        <img src={user.photoUrl} alt='' />
                      </IonAvatar>
                      <IonLabel className='label'>{user.name}</IonLabel>
                    </IonItem>
                  ))}
                  {searchUserHandler().length === 0 && (
                    <p>No artist found.</p>
                  )}
                </IonList>
              </IonCol>
            </IonRow>

            {/* Version 2: show nothing if search text is empty */}
            {/* {searchText ? (
              <>
                <h3 className='ion-margin ion-text-center'>Voices</h3>
                  <IonRow>
                    <IonCol>
                      <IonList className='ion-margin-start ion-margin-end'>
                        {searchVoiceHandler().map((voice) => (
                          <IonItem
                            key={voice.id}
                            className='vList item-list-color-search'
                            lines='full'
                            button
                            onClick={() => playVoiceHandler(voice)}
                          >
                            <IonAvatar className='avatar' slot='start'>
                              <img src={voice.images} alt={voice.name} />
                            </IonAvatar>
                            <IonLabel className='label'>{voice.name}</IonLabel>
                          </IonItem>
                        ))}
                        {searchVoiceHandler().length === 0 && (
                          <p>No voice found.</p>
                        )}
                      </IonList>
                    </IonCol>
                  </IonRow>

                  <h3 className='ion-margin ion-text-center'>Artists</h3>
                  <IonRow id='margin-for-float-btn-search'>
                    <IonCol>
                      <IonList className='ion-margin-start ion-margin-end'>
                        {searchUserHandler().map((user) => (
                          <IonItem
                            key={user.id}
                            className='vList item-list-color-search'
                            lines='full'
                            button
                            routerLink={`/another-profile/${user.id}`}
                          >
                            <IonAvatar className='avatar' slot='start'>
                              <img src={user.photoUrl} alt='' />
                            </IonAvatar>
                            <IonLabel className='label'>{user.name}</IonLabel>
                          </IonItem>
                        ))}
                        {searchUserHandler().length === 0 && (
                          <p>No artist found.</p>
                        )}
                      </IonList>
                    </IonCol>
                  </IonRow>
              </>
            ) : (
              <h3 className='ion-margin ion-text-center'>Search something...</h3>
            )} */}
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Search);