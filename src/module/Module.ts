Module.register("MMM-BrightnessControl", {
  getDom() {
    const dom = document.createElement("div");
    dom.innerText = "Hello World";

    return dom;
  },
  start() {
    this.sendSocketNotification("INIT", null);

    // (window as any).notificationReceived = (notfy: any, payload:any) => this.notificationReceived(notfy, payload, null as any);
  },

  notificationReceived(notification, payload) {
    switch (notification) {
      case "BrightnessControl_REDUCE":
        this.sendSocketNotification("REDUCE", null);
        break;
      case "BrightnessControl_INCREASE":
        this.sendSocketNotification("INCREASE", null);
        break;
      case "BrightnessControl_SET":
        this.sendSocketNotification("SET_VALUE", payload);
        break;
      case "BrightnessControl_GET":
        this.sendSocketNotification("GET_VALUE", payload);
        break;
    }
  },

  socketNotificationReceived(notification, payload) {
    switch (notification) {
      case "BRIGHTNESS":
        this.sendNotification("BrightnessControl_VALUE", payload);
        break;
    }
  }
});
