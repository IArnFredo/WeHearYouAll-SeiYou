import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { callOutline, videocamOutline, settingsOutline, sendOutline } from "ionicons/icons";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { userContext } from '../provider/User';
import './Chatting.css';
import Messages from './Messages';

const Chatting: React.FC = () => {
  const user = useContext(userContext);
  const db = getFirestore();
  const inputChat = useRef<HTMLIonInputElement>(null);
  const [text, setText] = useState<string>('');
  const [userData, setUserData] = useState<Array<any>>([]);
  const [msgs, setMsgs] = useState<Array<any>>([]);
  const [toast , useToast] = useIonToast();
  const user2 = useParams<{ userID: string }>().userID;
  const user1 = user.userId;


  useEffect(() => {
    const q1 = query(collection(db, "users"), where("UserID", "==", user2));
    onSnapshot(q1, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data() }));
      setUserData(data);
    })

    const id = user1! > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "chats", id, "messages");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, querySnapshot => {
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      setMsgs(data);
    })
  }, [])

  const submit = async (e: any) => {
    e.preventDefault();
    
    if (text == '') {
      return
    }

    const id = user1! > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    await addDoc(collection(db, "chats", id, "messages"), {
      id:id,
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
    });
    setText("");
  }

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref='/profile' />
            </IonButtons>
            <div className='chatbox__title'>
              <div className='chatbox__title-avatar-container'>
                {userData.map((user) => (
                  <>
                    <div>
                      {user.name}
                    </div>&nbsp;
                    <div className={`user_status ${user.isOnline ? "online" : "offline"}`}></div>
                  </>
                ))}
              </div>
              <span></span>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent className='bg-app big-container ion-margin-bottom'>
        {msgs.length ? msgs.map((msg, i) => <Messages key={i} msg={msg} user1={user1} />) : null}
          {/* <div className="base-container">
            <div className="friend-text-div">
              <div className="friend-text-container">
                <div className="friend-text">ss</div>
              </div>
            </div>
            <div className="my-text-div">
              <div className="my-text-container">
                <div className="my-text">Holaa!</div>
                <div className="my-text">Testing</div>
              </div>
            </div>
          </div> */}
        </IonContent>
        <IonFooter>
          <IonToolbar>
            <IonRow>
              <IonCol size="10">
                <IonInput ref={inputChat} onIonChange={e => setText(e.detail.value!)} value={text}> </IonInput>
              </IonCol>
              <IonCol size="2">
                <IonButton expand='block' onClick={submit} fill="clear" color="primary" className="msg-button">
                  <IonIcon icon={sendOutline} slot="icon-only"></IonIcon>
                </IonButton>
              </IonCol>
            </IonRow>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default Chatting;
