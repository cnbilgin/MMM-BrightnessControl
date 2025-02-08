(function () {
    'use strict';

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
            console.log("NOTFIY", notification);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTU1NLUJyaWdodG5lc3NDb250cm9sLmpzIiwic291cmNlcyI6WyJzcmMvbW9kdWxlL01vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJNb2R1bGUucmVnaXN0ZXIoXCJNTU0tQnJpZ2h0bmVzc0NvbnRyb2xcIiwge1xuICBnZXREb20oKSB7XG4gICAgY29uc3QgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkb20uaW5uZXJUZXh0ID0gXCJIZWxsbyBXb3JsZFwiO1xuXG4gICAgcmV0dXJuIGRvbTtcbiAgfSxcbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5zZW5kU29ja2V0Tm90aWZpY2F0aW9uKFwiSU5JVFwiLCBudWxsKTtcblxuICAgIC8vICh3aW5kb3cgYXMgYW55KS5ub3RpZmljYXRpb25SZWNlaXZlZCA9IChub3RmeTogYW55LCBwYXlsb2FkOmFueSkgPT4gdGhpcy5ub3RpZmljYXRpb25SZWNlaXZlZChub3RmeSwgcGF5bG9hZCwgbnVsbCBhcyBhbnkpO1xuICB9LFxuXG4gIG5vdGlmaWNhdGlvblJlY2VpdmVkKG5vdGlmaWNhdGlvbiwgcGF5bG9hZCkge1xuICAgIGNvbnNvbGUubG9nKFwiTk9URklZXCIsIG5vdGlmaWNhdGlvbik7XG4gICAgc3dpdGNoIChub3RpZmljYXRpb24pIHtcbiAgICAgIGNhc2UgXCJCcmlnaHRuZXNzQ29udHJvbF9SRURVQ0VcIjpcbiAgICAgICAgdGhpcy5zZW5kU29ja2V0Tm90aWZpY2F0aW9uKFwiUkVEVUNFXCIsIG51bGwpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJCcmlnaHRuZXNzQ29udHJvbF9JTkNSRUFTRVwiOlxuICAgICAgICB0aGlzLnNlbmRTb2NrZXROb3RpZmljYXRpb24oXCJJTkNSRUFTRVwiLCBudWxsKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQnJpZ2h0bmVzc0NvbnRyb2xfU0VUXCI6XG4gICAgICAgIHRoaXMuc2VuZFNvY2tldE5vdGlmaWNhdGlvbihcIlNFVF9WQUxVRVwiLCBwYXlsb2FkKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQnJpZ2h0bmVzc0NvbnRyb2xfR0VUXCI6XG4gICAgICAgIHRoaXMuc2VuZFNvY2tldE5vdGlmaWNhdGlvbihcIkdFVF9WQUxVRVwiLCBwYXlsb2FkKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9LFxuXG4gIHNvY2tldE5vdGlmaWNhdGlvblJlY2VpdmVkKG5vdGlmaWNhdGlvbiwgcGF5bG9hZCkge1xuICAgIHN3aXRjaCAobm90aWZpY2F0aW9uKSB7XG4gICAgICBjYXNlIFwiQlJJR0hUTkVTU1wiOlxuICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oXCJCcmlnaHRuZXNzQ29udHJvbF9WQUxVRVwiLCBwYXlsb2FkKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59KTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFO1FBQ3ZDLE1BQU0sR0FBQTtZQUNKLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ3pDLFFBQUEsR0FBRyxDQUFDLFNBQVMsR0FBRyxhQUFhO0lBRTdCLFFBQUEsT0FBTyxHQUFHO1NBQ1g7UUFDRCxLQUFLLEdBQUE7SUFDSCxRQUFBLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDOztTQUcxQztRQUVELG9CQUFvQixDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUE7SUFDeEMsUUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUM7WUFDbkMsUUFBUSxZQUFZO0lBQ2xCLFlBQUEsS0FBSywwQkFBMEI7SUFDN0IsZ0JBQUEsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7b0JBQzNDO0lBQ0YsWUFBQSxLQUFLLDRCQUE0QjtJQUMvQixnQkFBQSxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztvQkFDN0M7SUFDRixZQUFBLEtBQUssdUJBQXVCO0lBQzFCLGdCQUFBLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDO29CQUNqRDtJQUNGLFlBQUEsS0FBSyx1QkFBdUI7SUFDMUIsZ0JBQUEsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUM7b0JBQ2pEOztTQUVMO1FBRUQsMEJBQTBCLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBQTtZQUM5QyxRQUFRLFlBQVk7SUFDbEIsWUFBQSxLQUFLLFlBQVk7SUFDZixnQkFBQSxJQUFJLENBQUMsZ0JBQWdCLENBQUMseUJBQXlCLEVBQUUsT0FBTyxDQUFDO29CQUN6RDs7O0lBR1AsQ0FBQSxDQUFDOzs7Ozs7In0=
