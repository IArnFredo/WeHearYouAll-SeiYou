import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  withRouter,
} from "react-router-dom";
import { IonApp, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import AnotherProfile from "./pages/AnotherProfile";
import EditProfile from "./pages/EditProfile";
import EditVoice from "./pages/EditVoice";
import Home from "./pages/Home";
import LandingScreen from "./pages/LandingScreen";
import Login from "./pages/Login";
import Playing from "./pages/Playing";
import Profile from "./pages/Profile";
import RecordVoice from "./pages/RecordVoice";
import Register from "./pages/Register";
import Search from "./pages/Search";
import UploadVoice from "./pages/UploadVoice";
import YourVoiceList from "./pages/YourVoiceList";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./firebaseConfig";
import MenuTabs from "./tabsmenu/MenuTabs";
import React, { useContext, useEffect } from "react";
import { homeOutline, searchOutline, ellipsisVerticalCircleOutline } from "ionicons/icons";
import UserContextProvider from "./provider/UserContextProvider";
import { userContext } from "./provider/User";
import UrlChanger from "./pages/UrlChanger";
import { createBrowserHistory } from 'history';
import SoundPlayer from "./pages/SoundPlayer";
import SoundsContext from "./provider/SoundsContext";

setupIonicReact({
  hardwareBackButton: true,
  // animated: false,
});


const App: React.FC = () => {
  const location = useLocation();

  return (
    <UserContextProvider>
      <SoundsContext>
        <IonApp>
          <SoundPlayer />
          <IonRouterOutlet>
            <Route exact path="/">
              <Redirect to="/default" />
            </Route>
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
            <Route path="/playing" component={Playing}>
              <Playing />
            </Route>
            <Route path="/record-voice" exact={true} >
              <RecordVoice />
            </Route>
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
