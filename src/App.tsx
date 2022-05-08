import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import AnotherProfile from './pages/AnotherProfile';
import EditProfile from './pages/EditProfile';
import EditVoice from './pages/EditVoice';
import Home from './pages/Home';
import LandingScreen from './pages/LandingScreen';
import Login from './pages/Login';
import Playing from './pages/Playing';
import Profile from './pages/Profile';
import RecordVoice from './pages/RecordVoice';
import Register from './pages/Register';
import Search from './pages/Search';
import UploadVoice from './pages/UploadVoice';
import YourVoiceList from './pages/YourVoiceList';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';


/* Theme variables */
import './theme/variables.css';
import './firebaseConfig';
import MenuTabs from './tabsmenu/MenuTabs';
setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/">
          <Redirect to="/@welcome" />
        </Route>
        <Route path="/@home" component={MenuTabs} />
        <Route path="/@another-profile" component={MenuTabs} />
        <Route path="/@profile" component={MenuTabs} />
        <Route path="/@search" component={MenuTabs} />
        {/* without tabs */}
        <Route path="/@edit-profile" component={EditProfile} />
        <Route path="/@edit-voice" component={EditVoice} />
        <Route path="/@welcome" component={LandingScreen} />
        <Route path="/@login" component={Login} exact={true} />
        <Route path="/@playing" component={Playing} exact={true} />
        <Route path="/@record-voice" component={RecordVoice} />
        <Route path="/@register" component={Register} />
        <Route path="/@upload-voice" component={UploadVoice} />
        <Route path="/@your-voice-list" component={YourVoiceList} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
