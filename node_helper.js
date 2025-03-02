'use strict';

var NodeHelper = require('node_helper');
var child_process = require('child_process');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var NodeHelper__namespace = /*#__PURE__*/_interopNamespaceDefault(NodeHelper);

const GET_BRIGHTNESS_COMMAND = `ddcutil getvcp 10 | grep -Po "(?<=current value =)[ \\t]*\\K[0-9]+"`;
const SET_BRIGHTNESS_COMMAND = `ddcutil setvcp 10 {{value}}`;
class Brightness {
    constructor() {
        this.value = 0;
        this.collectValue().then((value) => {
            this.value = value;
        });
    }
    getValue() {
        this.collectValue();
        return this.value;
    }
    async changeValue(value) {
        const newValue = Math.max(Math.min(value, 100), 0);
        console.log("changeValue", value, newValue);
        const command = SET_BRIGHTNESS_COMMAND.replace("{{value}}", newValue.toString());
        await execPromise(command);
        this.value = newValue;
    }
    async changeValueBy(val) {
        await this.changeValue(this.value + val);
    }
    async collectValue() {
        const out = await execPromise(GET_BRIGHTNESS_COMMAND).catch((e) => {
            console.error(e);
            return 0;
        });
        return Number(out);
    }
}
const execPromise = (command) => {
    return new Promise((resolve, reject) => {
        child_process.exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`exec error: ${error}`);
                return;
            }
            if (stderr) {
                reject(`stderr: ${stderr}`);
                return;
            }
            resolve(stdout);
        });
    });
};

var Helper = NodeHelper__namespace.create({
    brightness: null,
    start() {
        console.log("MMM-BrightnessControl - Node Helper started");
        this.brightness = new Brightness();
    },
    async socketNotificationReceived(notification, payload) {
        console.log(notification, payload);
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

module.exports = Helper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9oZWxwZXIuanMiLCJzb3VyY2VzIjpbInNyYy9ub2RlL0JyaWdodG5lc3MudHMiLCJzcmMvbm9kZS9IZWxwZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhlYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5cbmNvbnN0IEdFVF9CUklHSFRORVNTX0NPTU1BTkQgPSBgZGRjdXRpbCBnZXR2Y3AgMTAgfCBncmVwIC1QbyBcIig/PD1jdXJyZW50IHZhbHVlID0pWyBcXFxcdF0qXFxcXEtbMC05XStcImA7XG5jb25zdCBTRVRfQlJJR0hUTkVTU19DT01NQU5EID0gYGRkY3V0aWwgc2V0dmNwIDEwIHt7dmFsdWV9fWA7XG5cbmV4cG9ydCBjbGFzcyBCcmlnaHRuZXNzIHtcbiAgdmFsdWU6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jb2xsZWN0VmFsdWUoKS50aGVuKCh2YWx1ZSkgPT4ge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0VmFsdWUoKSB7XG4gICAgdGhpcy5jb2xsZWN0VmFsdWUoKTtcblxuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9XG5cbiAgYXN5bmMgY2hhbmdlVmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gTWF0aC5tYXgoTWF0aC5taW4odmFsdWUsIDEwMCksIDApO1xuICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlVmFsdWVcIiwgdmFsdWUsIG5ld1ZhbHVlKTtcblxuICAgIGNvbnN0IGNvbW1hbmQgPSBTRVRfQlJJR0hUTkVTU19DT01NQU5ELnJlcGxhY2UoXG4gICAgICBcInt7dmFsdWV9fVwiLFxuICAgICAgbmV3VmFsdWUudG9TdHJpbmcoKVxuICAgICk7XG5cbiAgICBhd2FpdCBleGVjUHJvbWlzZShjb21tYW5kKTtcbiAgICB0aGlzLnZhbHVlID0gbmV3VmFsdWU7XG4gIH1cblxuICBhc3luYyBjaGFuZ2VWYWx1ZUJ5KHZhbDogbnVtYmVyKSB7XG4gICAgYXdhaXQgdGhpcy5jaGFuZ2VWYWx1ZSh0aGlzLnZhbHVlICsgdmFsKTtcbiAgfVxuXG4gIGFzeW5jIGNvbGxlY3RWYWx1ZSgpIHtcbiAgICBjb25zdCBvdXQgPSBhd2FpdCBleGVjUHJvbWlzZShHRVRfQlJJR0hUTkVTU19DT01NQU5EKS5jYXRjaCgoZSkgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgIHJldHVybiAwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIE51bWJlcihvdXQpO1xuICB9XG59XG5cbmNvbnN0IGV4ZWNQcm9taXNlID0gKGNvbW1hbmQ6IHN0cmluZykgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGV4ZWMoY29tbWFuZCwgKGVycm9yLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJlamVjdChgZXhlYyBlcnJvcjogJHtlcnJvcn1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHN0ZGVycikge1xuICAgICAgICByZWplY3QoYHN0ZGVycjogJHtzdGRlcnJ9YCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZShzdGRvdXQpO1xuICAgIH0pO1xuICB9KTtcbn07XG4iLCJpbXBvcnQgKiBhcyBOb2RlSGVscGVyIGZyb20gXCJub2RlX2hlbHBlclwiO1xuaW1wb3J0IHsgQnJpZ2h0bmVzcyB9IGZyb20gXCIuL0JyaWdodG5lc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgTm9kZUhlbHBlci5jcmVhdGUoe1xuICBicmlnaHRuZXNzOiBudWxsLFxuICBzdGFydCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIk1NTS1CcmlnaHRuZXNzQ29udHJvbCAtIE5vZGUgSGVscGVyIHN0YXJ0ZWRcIik7XG5cbiAgICB0aGlzLmJyaWdodG5lc3MgPSBuZXcgQnJpZ2h0bmVzcygpO1xuICB9LFxuXG4gIGFzeW5jIHNvY2tldE5vdGlmaWNhdGlvblJlY2VpdmVkKG5vdGlmaWNhdGlvbiwgcGF5bG9hZCkge1xuICAgIGNvbnNvbGUubG9nKG5vdGlmaWNhdGlvbiwgcGF5bG9hZCk7XG4gICAgc3dpdGNoIChub3RpZmljYXRpb24pIHtcbiAgICAgIGNhc2UgXCJJTklUXCI6XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwiUkVEVUNFXCI6XG4gICAgICAgIHRoaXMuYnJpZ2h0bmVzcy5jaGFuZ2VWYWx1ZUJ5KC0xMCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwiSU5DUkVBU0VcIjpcbiAgICAgICAgdGhpcy5icmlnaHRuZXNzLmNoYW5nZVZhbHVlQnkoMTApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJTRVRfVkFMVUVcIjpcbiAgICAgICAgdGhpcy5icmlnaHRuZXNzLmNoYW5nZVZhbHVlKHBheWxvYWQudmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJHRVRfVkFMVUVcIjpcbiAgICAgICAgdGhpcy5zZW5kU29ja2V0Tm90aWZpY2F0aW9uKFwiQlJJR0hUTkVTU1wiLCB0aGlzLmJyaWdodG5lc3MuZ2V0VmFsdWUoKSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufSk7XG4iXSwibmFtZXMiOlsiZXhlYyIsIk5vZGVIZWxwZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQSxtRUFBQSxDQUFxRTtBQUNwRyxNQUFNLHNCQUFzQixHQUFHLENBQUEsMkJBQUEsQ0FBNkI7TUFFL0MsVUFBVSxDQUFBO0FBR3JCLElBQUEsV0FBQSxHQUFBO1FBRkEsSUFBSyxDQUFBLEtBQUEsR0FBVyxDQUFDO1FBR2YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSTtBQUNqQyxZQUFBLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSztB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
