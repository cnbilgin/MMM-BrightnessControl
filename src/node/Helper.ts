import * as NodeHelper from "node_helper";
import { Brightness } from "./Brightness";

export default NodeHelper.create({
  brightness: null,
  start() {
    this.brightness = new Brightness();
  },

  async socketNotificationReceived(notification, payload) {
    switch (notification) {
      case "INIT":
        break;

      case "REDUCE":
        this.brightness.changeValueBy(-10);
        break;

      case "INCREASE":
        this.brightness.changeValueBy(10);
        break;
      case "SET_VALUE":
        this.brightness.changeValue(payload.value);
        break;
      case "GET_VALUE":
        this.sendSocketNotification("BRIGHTNESS", this.brightness.getValue());
        break;
    }
  }
});
