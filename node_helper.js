'use strict';

var NodeHelper = require('node_helper');

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

var Helper = NodeHelper__namespace.create({
    start() {
        console.log("MMM-BrightnessControl - Node Helper started");
    },
    async socketNotificationReceived(notification, payload) {
        console.log("MMM-BrightnessControl - Notification received", notification);
    }
});

module.exports = Helper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9oZWxwZXIuanMiLCJzb3VyY2VzIjpbInNyYy9ub2RlL0hlbHBlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBOb2RlSGVscGVyIGZyb20gXCJub2RlX2hlbHBlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBOb2RlSGVscGVyLmNyZWF0ZSh7XG4gIHN0YXJ0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiTU1NLUJyaWdodG5lc3NDb250cm9sIC0gTm9kZSBIZWxwZXIgc3RhcnRlZFwiKTtcbiAgfSxcblxuICBhc3luYyBzb2NrZXROb3RpZmljYXRpb25SZWNlaXZlZChub3RpZmljYXRpb24sIHBheWxvYWQpIHtcbiAgICBjb25zb2xlLmxvZyhcIk1NTS1CcmlnaHRuZXNzQ29udHJvbCAtIE5vdGlmaWNhdGlvbiByZWNlaXZlZFwiLCBub3RpZmljYXRpb24pO1xuICB9XG59KTtcbiJdLCJuYW1lcyI6WyJOb2RlSGVscGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGFBQWVBLHFCQUFVLENBQUMsTUFBTSxDQUFDO0lBQy9CLEtBQUssR0FBQTtBQUNILFFBQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsQ0FBQztLQUMzRDtBQUVELElBQUEsTUFBTSwwQkFBMEIsQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFBO0FBQ3BELFFBQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsRUFBRSxZQUFZLENBQUM7O0FBRTdFLENBQUEsQ0FBQzs7OzsifQ==
