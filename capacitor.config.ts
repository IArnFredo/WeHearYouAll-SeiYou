import { CapacitorConfig } from '@capacitor/cli';
import { SplashScreen } from '@capacitor/splash-screen';

const config: CapacitorConfig = {
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      splashFullScreen: true,
    },
  },
  appId: 'com.seiyou.app',
  appName: 'SeiYou',
  webDir: 'build',
  bundledWebRuntime: false
};




export default config;
