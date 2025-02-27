package io.ionic.testpushkws;

import android.util.Log;

import androidx.annotation.NonNull;
import com.capacitorjs.plugins.pushnotifications.PushNotificationsPlugin;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class MyMessagingService extends FirebaseMessagingService {

  @Override
  public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
    // Determine if remoteMessage needs to be transformed
    // Parse into correctly formatted payload for a notification type message

    String title = remoteMessage.getNotification().getTitle();
    String body = remoteMessage.getNotification().getBody();

    if (title != null) {
      Log.d("title: ", title);
    }

    if (body != null) {
      Log.d("body: ", body);
    }

    super.onMessageReceived(remoteMessage);
    PushNotificationsPlugin.sendRemoteMessage(remoteMessage);
  }

  @Override
  public void onNewToken(@NonNull String s) {
    super.onNewToken(s);
    PushNotificationsPlugin.onNewToken(s);
  }
}
