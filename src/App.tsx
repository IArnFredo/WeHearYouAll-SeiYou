import {
  Redirect,
  Route,
  Switch,
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
import React from "react";
import { homeOutline, searchOutline, ellipsisVerticalCircleOutline } from "ionicons/icons";
import SoundPlayer from "./pages/SoundPlayer";
setupIonicReact({
  hardwareBackButton: false
});

const App: React.FC = () => {

  return (
    <IonApp>
      <IonPage>
        {/* <SoundPlayer/> */}
        <IonReactRouter>
          <IonRouterOutlet>
            <IonTabs>
              <IonRouterOutlet>
                <Switch>
                  <Route exact path="/@another-profile">
                    <AnotherProfile />
                  </Route>
                  <Route exact path="/@search">
                    <Search />
                  </Route>
                  <Route exact path="/@home">
                    <Home />
                  </Route>
                  <Route path="/@profile" component={Profile} />
                </Switch>
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/@home">
                  <IonIcon icon={homeOutline} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/@search">
                  <IonIcon icon={searchOutline} />
                  <IonLabel>Search</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/@profile">
                  <IonIcon icon={ellipsisVerticalCircleOutline} />
                  <IonLabel>Profile</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>

            <Route exact path="/">
              <Redirect to="/@welcome" />
            </Route>

            {/* without tabs */}
            <Route path="/@edit-profile" component={EditProfile} />
            <Route path="/@edit-voice" component={EditVoice} />
            <Route path="/@welcome" component={LandingScreen} />
            <Route path="/@login" component={Login} />
            <Route path="/@playing" component={withRouter(Playing)} exact={true} />
            <Route path="/@record-voice" component={RecordVoice} />
            <Route path="/@register" component={Register} />
            <Route path="/@upload-voice" component={UploadVoice} />
            <Route path="/@your-voice-list" component={YourVoiceList} />
            {/* </Switch> */}

          </IonRouterOutlet>
        </IonReactRouter>
      </IonPage>
    </IonApp>
  );
};
export default App;
