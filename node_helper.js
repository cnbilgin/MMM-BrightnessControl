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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9oZWxwZXIuanMiLCJzb3VyY2VzIjpbInNyYy9ub2RlL0JyaWdodG5lc3MudHMiLCJzcmMvbm9kZS9IZWxwZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhlYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5cbmNvbnN0IEdFVF9CUklHSFRORVNTX0NPTU1BTkQgPSBgZGRjdXRpbCBnZXR2Y3AgMTAgfCBncmVwIC1QbyBcIig/PD1jdXJyZW50IHZhbHVlID0pWyBcXFxcdF0qXFxcXEtbMC05XStcImA7XG5jb25zdCBTRVRfQlJJR0hUTkVTU19DT01NQU5EID0gYGRkY3V0aWwgc2V0dmNwIDEwIHt7dmFsdWV9fWA7XG5cbmV4cG9ydCBjbGFzcyBCcmlnaHRuZXNzIHtcbiAgdmFsdWU6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jb2xsZWN0VmFsdWUoKS50aGVuKCh2YWx1ZSkgPT4ge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0VmFsdWUoKSB7XG4gICAgdGhpcy5jb2xsZWN0VmFsdWUoKTtcblxuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9XG5cbiAgYXN5bmMgY2hhbmdlVmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gTWF0aC5tYXgoTWF0aC5taW4odmFsdWUsIDEwMCksIDApO1xuXG4gICAgY29uc3QgY29tbWFuZCA9IFNFVF9CUklHSFRORVNTX0NPTU1BTkQucmVwbGFjZShcbiAgICAgIFwie3t2YWx1ZX19XCIsXG4gICAgICBuZXdWYWx1ZS50b1N0cmluZygpXG4gICAgKTtcblxuICAgIGF3YWl0IGV4ZWNQcm9taXNlKGNvbW1hbmQpO1xuICAgIHRoaXMudmFsdWUgPSBuZXdWYWx1ZTtcbiAgfVxuXG4gIGFzeW5jIGNoYW5nZVZhbHVlQnkodmFsOiBudW1iZXIpIHtcbiAgICBhd2FpdCB0aGlzLmNoYW5nZVZhbHVlKHRoaXMudmFsdWUgKyB2YWwpO1xuICB9XG5cbiAgYXN5bmMgY29sbGVjdFZhbHVlKCkge1xuICAgIGNvbnN0IG91dCA9IGF3YWl0IGV4ZWNQcm9taXNlKEdFVF9CUklHSFRORVNTX0NPTU1BTkQpLmNhdGNoKChlKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gTnVtYmVyKG91dCk7XG4gIH1cbn1cblxuY29uc3QgZXhlY1Byb21pc2UgPSAoY29tbWFuZDogc3RyaW5nKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZXhlYyhjb21tYW5kLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmVqZWN0KGBleGVjIGVycm9yOiAke2Vycm9yfWApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoc3RkZXJyKSB7XG4gICAgICAgIHJlamVjdChgc3RkZXJyOiAke3N0ZGVycn1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZXNvbHZlKHN0ZG91dCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbiIsImltcG9ydCAqIGFzIE5vZGVIZWxwZXIgZnJvbSBcIm5vZGVfaGVscGVyXCI7XG5pbXBvcnQgeyBCcmlnaHRuZXNzIH0gZnJvbSBcIi4vQnJpZ2h0bmVzc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBOb2RlSGVscGVyLmNyZWF0ZSh7XG4gIGJyaWdodG5lc3M6IG51bGwsXG4gIHN0YXJ0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiTU1NLUJyaWdodG5lc3NDb250cm9sIC0gTm9kZSBIZWxwZXIgc3RhcnRlZFwiKTtcblxuICAgIHRoaXMuYnJpZ2h0bmVzcyA9IG5ldyBCcmlnaHRuZXNzKCk7XG4gIH0sXG5cbiAgYXN5bmMgc29ja2V0Tm90aWZpY2F0aW9uUmVjZWl2ZWQobm90aWZpY2F0aW9uLCBwYXlsb2FkKSB7XG4gICAgc3dpdGNoIChub3RpZmljYXRpb24pIHtcbiAgICAgIGNhc2UgXCJJTklUXCI6XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwiUkVEVUNFXCI6XG4gICAgICAgIHRoaXMuYnJpZ2h0bmVzcy5jaGFuZ2VWYWx1ZUJ5KC0xMCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwiSU5DUkVBU0VcIjpcbiAgICAgICAgdGhpcy5icmlnaHRuZXNzLmNoYW5nZVZhbHVlQnkoMTApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJTRVRfVkFMVUVcIjpcbiAgICAgICAgdGhpcy5icmlnaHRuZXNzLmNoYW5nZVZhbHVlKHBheWxvYWQudmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJHRVRfVkFMVUVcIjpcbiAgICAgICAgdGhpcy5zZW5kU29ja2V0Tm90aWZpY2F0aW9uKFwiQlJJR0hUTkVTU1wiLCB0aGlzLmJyaWdodG5lc3MuZ2V0VmFsdWUoKSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufSk7XG4iXSwibmFtZXMiOlsiZXhlYyIsIk5vZGVIZWxwZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQSxtRUFBQSxDQUFxRTtBQUNwRyxNQUFNLHNCQUFzQixHQUFHLENBQUEsMkJBQUEsQ0FBNkI7TUFFL0MsVUFBVSxDQUFBO0FBR3JCLElBQUEsV0FBQSxHQUFBO1FBRkEsSUFBSyxDQUFBLEtBQUEsR0FBVyxDQUFDO1FBR2YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSTtBQUNqQyxZQUFBLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSztBQUNwQixTQUFDLENBQUM7O0lBR0osUUFBUSxHQUFBO1FBQ04sSUFBSSxDQUFDLFlBQVksRUFBRTtRQUVuQixPQUFPLElBQUksQ0FBQyxLQUFLOztJQUduQixNQUFN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
