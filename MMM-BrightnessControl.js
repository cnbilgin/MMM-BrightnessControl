(function () {
    'use strict';

    Module.register("MMM-BrightnessControl", {
        getDom() {
            const dom = document.createElement("div");
            dom.innerText = "";
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

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTU1NLUJyaWdodG5lc3NDb250cm9sLmpzIiwic291cmNlcyI6WyJzcmMvbW9kdWxlL01vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJNb2R1bGUucmVnaXN0ZXIoXCJNTU0tQnJpZ2h0bmVzc0NvbnRyb2xcIiwge1xuICBnZXREb20oKSB7XG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkb20uaW5uZXJUZXh0ID0gXCJcIjtcblxuICAgIHJldHVybiBkb207XG4gIH0sXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMuc2VuZFNvY2tldE5vdGlmaWNhdGlvbihcIklOSVRcIiwgbnVsbCk7XG5cbiAgICAvLyAod2luZG93IGFzIGFueSkubm90aWZpY2F0aW9uUmVjZWl2ZWQgPSAobm90Znk6IGFueSwgcGF5bG9hZDphbnkpID0+IHRoaXMubm90aWZpY2F0aW9uUmVjZWl2ZWQobm90ZnksIHBheWxvYWQsIG51bGwgYXMgYW55KTtcbiAgfSxcblxuICBub3RpZmljYXRpb25SZWNlaXZlZChub3RpZmljYXRpb24sIHBheWxvYWQpIHtcbiAgICBzd2l0Y2ggKG5vdGlmaWNhdGlvbikge1xuICAgICAgY2FzZSBcIkJyaWdodG5lc3NDb250cm9sX1JFRFVDRVwiOlxuICAgICAgICB0aGlzLnNlbmRTb2NrZXROb3RpZmljYXRpb24oXCJSRURVQ0VcIiwgbnVsbCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkJyaWdodG5lc3NDb250cm9sX0lOQ1JFQVNFXCI6XG4gICAgICAgIHRoaXMuc2VuZFNvY2tldE5vdGlmaWNhdGlvbihcIklOQ1JFQVNFXCIsIG51bGwpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJCcmlnaHRuZXNzQ29udHJvbF9TRVRcIjpcbiAgICAgICAgdGhpcy5zZW5kU29ja2V0Tm90aWZpY2F0aW9uKFwiU0VUX1ZBTFVFXCIsIHBheWxvYWQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJCcmlnaHRuZXNzQ29udHJvbF9HRVRcIjpcbiAgICAgICAgdGhpcy5zZW5kU29ja2V0Tm90aWZpY2F0aW9uKFwiR0VUX1ZBTFVFXCIsIHBheWxvYWQpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0sXG5cbiAgc29ja2V0Tm90aWZpY2F0aW9uUmVjZWl2ZWQobm90aWZpY2F0aW9uLCBwYXlsb2FkKSB7XG4gICAgc3dpdGNoIChub3RpZmljYXRpb24pIHtcbiAgICAgIGNhc2UgXCJCUklHSFRORVNTXCI6XG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihcIkJyaWdodG5lc3NDb250cm9sX1ZBTFVFXCIsIHBheWxvYWQpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUU7UUFDdkMsTUFBTSxHQUFBO1lBQ0osTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDekMsUUFBQSxHQUFHLENBQUMsU0FBUyxHQUFHLEVBQUU7SUFFbEIsUUFBQSxPQUFPLEdBQUc7U0FDWDtRQUNELEtBQUssR0FBQTtJQUNILFFBQUEsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7O1NBRzFDO1FBRUQsb0JBQW9CLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBQTtZQUN4QyxRQUFRLFlBQVk7SUFDbEIsWUFBQSxLQUFLLDBCQUEwQjtJQUM3QixnQkFBQSxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQztvQkFDM0M7SUFDRixZQUFBLEtBQUssNEJBQTRCO0lBQy9CLGdCQUFBLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDO29CQUM3QztJQUNGLFlBQUEsS0FBSyx1QkFBdUI7SUFDMUIsZ0JBQUEsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUM7b0JBQ2pEO0lBQ0YsWUFBQSxLQUFLLHVCQUF1QjtJQUMxQixnQkFBQSxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQztvQkFDakQ7O1NBRUw7UUFFRCwwQkFBMEIsQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFBO1lBQzlDLFFBQVEsWUFBWTtJQUNsQixZQUFBLEtBQUssWUFBWTtJQUNmLGdCQUFBLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsRUFBRSxPQUFPLENBQUM7b0JBQ3pEOzs7SUFHUCxDQUFBLENBQUM7Ozs7OzsifQ==
