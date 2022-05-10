import { CapacitorConfig } from '@capacitor/cli';
import { SplashScreen } from '@capacitor/splash-screen';

const config: CapacitorConfig = {
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      splashFullScreen: true,
    },
  },
  "server": {
    "url": "http://192.168.100.32:8100",
    "cleartext": true
  },
  appId: 'io.ionic.starter',
  appName: 'WeHearYouAll-SeiYou',
  webDir: 'build',
  bundledWebRuntime: false
};




export default config;
