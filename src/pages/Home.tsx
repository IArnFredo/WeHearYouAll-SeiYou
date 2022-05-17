import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonList,
  IonItem,
  IonAvatar,
  IonFab,
} from "@ionic/react";
import "./Home.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import React, { useRef } from "react";
import { getTracks, useSoundsContext } from "../provider/Sounds";

const Home: React.FC = (props) => {
  console.log(props);
  
  const { state, dispatch } = useSoundsContext();

  const trackSounds = getTracks(state);
  return (
    <IonPage className="bg-app-home">
      <IonContent className="home-content">
        <IonRow id="margin-for-float-btn">
          <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
            <IonRow className="home-title">
              <IonLabel className="ion-margin-top"><b>Welcome!</b></IonLabel>
            </IonRow>
            <IonGrid>
              {/* Recently Upload */}
              <IonRow className="home-subtitle">
                <IonLabel className="ion-margin-top">Recently Upload</IonLabel>
              </IonRow>
              <IonList className="home-recently-list">
                <IonRow>
                  {trackSounds && trackSounds.map((sound: any, index: any) => (
                    <IonCol size="6" key={index}>
                      <IonItem className="home-vList" button>
                        <IonAvatar slot="start">
                          <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                        </IonAvatar>
                        <div>
                          <p className="title-text"><b>{sound.name}</b></p>
                          <p className="title-text">Name</p>
                        </div>
                      </IonItem>
                    </IonCol>
                  ))}

                  {/* <IonCol size="6">
                    <IonItem className="home-vList" button routerLink="/playing">
                      <IonAvatar className="avatar" slot="start">
                        <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                      </IonAvatar>
                      <div>
                        <p className="title-text"><b>Voice title</b></p>
                        <p className="title-text">Name</p>
                      </div>
                    </IonItem>
                  </IonCol>
                  <IonCol size="6">
                    <IonItem className="home-vList" button routerLink="/@playing">
                      <IonAvatar className="avatar" slot="start">
                        <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                      </IonAvatar>
                      <div>
                        <p className="title-text"><b>Voice title</b></p>
                        <p className="title-text">Name</p>
                      </div>
                    </IonItem>
                  </IonCol> */}
                </IonRow>
              </IonList>
              {/* End Recently Upload */}

              {/* Most Popular */}
              <IonRow className="home-subtitle">
                <IonLabel className="ion-margin-top">Most Popular</IonLabel>
              </IonRow>
              <IonList className="home-recently-list">
                <IonRow>
                  <IonCol size="6">
                    <IonItem className="home-vList" button routerLink="/playing">
                      <IonAvatar slot="start">
                        <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                      </IonAvatar>
                      <div>
                        <p className="title-text"><b>Voice title</b></p>
                        <p className="title-text">Name</p>
                      </div>
                    </IonItem>
                  </IonCol>
                  <IonCol size="6">
                    <IonItem className="home-vList" button routerLink="/playing">
                      <IonAvatar slot="start">
                        <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                      </IonAvatar>
                      <div>
                        <p className="title-text"><b>Voice title</b></p>
                        <p className="title-text">Name</p>
                      </div>
                    </IonItem>
                  </IonCol>
                  <IonCol size="6">
                    <IonItem className="home-vList" button routerLink="/playing">
                      <IonAvatar slot="start">
                        <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                      </IonAvatar>
                      <div>
                        <p className="title-text"><b>Voice title</b></p>
                        <p className="title-text">Name</p>
                      </div>
                    </IonItem>
                  </IonCol>
                  <IonCol size="6">
                    <IonItem className="home-vList" button routerLink="/playing">
                      <IonAvatar slot="start">
                        <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                      </IonAvatar>
                      <div>
                        <p className="title-text"><b>Voice title</b></p>
                        <p className="title-text">Name</p>
                      </div>
                    </IonItem>
                  </IonCol>
                  <IonCol size="6">
                    <IonItem className="home-vList" button routerLink="/playing">
                      <IonAvatar slot="start">
                        <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                      </IonAvatar>
                      <div>
                        <p className="title-text"><b>Voice title</b></p>
                        <p className="title-text">Name</p>
                      </div>
                    </IonItem>
                  </IonCol>
                  <IonCol size="6">
                    <IonItem className="home-vList" button routerLink="/playing">
                      <IonAvatar slot="start">
                        <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                      </IonAvatar>
                      <div>
                        <p className="title-text"><b>Voice title</b></p>
                        <p className="title-text">Name</p>
                      </div>
                    </IonItem>
                  </IonCol>
                  <IonCol size="6">
                    <IonItem className="home-vList" button routerLink="/playing">
                      <IonAvatar slot="start">
                        <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                      </IonAvatar>
                      <div>
                        <p className="title-text"><b>Voice title</b></p>
                        <p className="title-text">Name</p>
                      </div>
                    </IonItem>
                  </IonCol>
                  <IonCol size="6">
                    <IonItem className="home-vList" button routerLink="/playing">
                      <IonAvatar slot="start">
                        <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                      </IonAvatar>
                      <div>
                        <p className="title-text"><b>Voice title</b></p>
                        <p className="title-text">Name</p>
                      </div>
                    </IonItem>
                  </IonCol>
                  <IonCol size="6">
                    <IonItem className="home-vList" button routerLink="/playing">
                      <IonAvatar slot="start">
                        <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                      </IonAvatar>
                      <div>
                        <p className="title-text"><b>Voice title</b></p>
                        <p className="title-text">Name</p>
                      </div>
                    </IonItem>
                  </IonCol>
                  <IonCol size="6">
                    <IonItem className="home-vList" button routerLink="/playing">
                      <IonAvatar slot="start">
                        <img src="https://ilogo.co.id/wp-content/uploads/2021/07/dummy-image-square.jpg" alt="" />
                      </IonAvatar>
                      <div>
                        <p className="title-text"><b>Voice title</b></p>
                        <p className="title-text">Name</p>
                      </div>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonList>
              {/* End Most Popular */}
            </IonGrid>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Home);


