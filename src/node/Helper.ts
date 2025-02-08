import * as NodeHelper from "node_helper";

export default NodeHelper.create({
  start() {
    console.log("MMM-BrightnessControl - Node Helper started");
  },

  async socketNotificationReceived(notification, payload) {
    console.log("MMM-BrightnessControl - Notification received", notification);
  }
});
