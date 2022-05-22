import { App as app } from '@capacitor/app';
import { IonApp, IonRouterOutlet, setupIonicReact, useIonActionSheet } from "@ionic/react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import React from "react";
import {
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import "./firebaseConfig";
import EditProfile from "./pages/EditProfile";
import LandingScreen from "./pages/LandingScreen";
import Login from "./pages/Login";
import Playing from "./pages/Playing";
import RecordVoice from "./pages/RecordVoice";
import Register from "./pages/Register";
import SoundPlayer from "./pages/SoundPlayer";
import UrlChanger from "./pages/UrlChanger";
import SoundsContext from "./provider/SoundsContext";
import UserContextProvider from "./provider/UserContextProvider";
import MenuTabs from "./tabsmenu/MenuTabs";
/* Theme variables */
import "./theme/variables.css";
setupIonicReact({
  hardwareBackButton: true,
  // animated: false,
});

const App: React.FC = () => {
  const [actionSheet, dismiss] = useIonActionSheet();
  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(10, () => {
      actionSheet({
        header: 'Are you sure you want to exit?',
        buttons: [{
          text: 'Yes',
          handler: () => {
            app.exitApp();
          }
        }, {
          text: 'No',
          handler: () => {
            dismiss();
          }
        }]
      })
    })
  });

  return (
    <UserContextProvider>
      <SoundsContext>
        <IonApp>
          <SoundPlayer />
          <IonRouterOutlet>
            <Route path="/" exact={true} render={() => <Redirect to={'/default'} />} />
            <Route path="/default" component={UrlChanger} />
            <Route path="/welcome" exact={true}>
              <LandingScreen />
            </Route>
            <Route path="/edit-profile" exact>
              <EditProfile />
            </Route>
            <Route path="/login" exact={true}>
              <Login />
            </Route>
            <Route path="/playing" component={Playing} exact />
            <Route path="/record-voice" exact={true} component={RecordVoice} />
            <Route path="/register" exact={true}>
              <Register />
            </Route>
            <Switch>
              <Route path="/edit-voice" exact={true} component={MenuTabs} />
              <Route path="/upload-voice" exact={true} component={MenuTabs} />
              <Route path="/your-voice-list" exact={true} component={MenuTabs} />
              <Route exact path="/another-profile/:userID" component={MenuTabs} />
              <Route exact path="/:tab(search)" component={MenuTabs} />
              <Route exact path="/:tab(home)" component={MenuTabs} />
              <Route exact={true} path="/:tab(profile)" component={MenuTabs} />
            </Switch>
          </IonRouterOutlet>
        </IonApp>
      </SoundsContext>
    </UserContextProvider >
  );
};
export default App;
