import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ActionPerformed, PushNotifications, Token } from '@capacitor/push-notifications';
import Home from './pages/Home';

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
import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

const App: React.FC = () => {
  let doCheck = true;

  const pushIsAvailable = Capacitor.isPluginAvailable('PushNotifications');

  if (pushIsAvailable) {
    PushNotifications.addListener('registration', async (token: Token) => {
      console.log('Got token', token);
    });
    PushNotifications.addListener('registrationError', err => {
      console.error(err);
    });
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      // TODO Replace this once routing is in place and we know the structure of URLs we want to create for deep linking
      alert(JSON.stringify(notification));
    });
  }

  useEffect(() => {
    const check = async () => {
      const res = await PushNotifications.requestPermissions();
      if (res.receive === 'granted') {
        await PushNotifications.register();
      }
      alert(res.receive);
    };

    if (pushIsAvailable && doCheck) {
      doCheck = false;
      check();
    }
  }, [pushIsAvailable]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};
export default App;
