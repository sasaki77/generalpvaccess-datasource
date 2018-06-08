"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, GenericConfigCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export("GenericConfigCtrl", GenericConfigCtrl = function () {
        function GenericConfigCtrl($scope, $injector) {
          _classCallCheck(this, GenericConfigCtrl);

          this.scope = $scope;
          this.current.jsonData.noparams = this.current.jsonData.noparams || 0;
          this.current.jsonData.param_names = this.current.jsonData.param_names || [];
          this.current.jsonData.entityLabel = this.current.jsonData.entityLabel || "entity";
          this.current.jsonData.startLabel = this.current.jsonData.startLabel || "starttime";
          this.current.jsonData.endLabel = this.current.jsonData.endLabel || "endtime";
          this.current.jsonData.enbNTURI = this.current.jsonData.enbNTURI || false;
        }

        _createClass(GenericConfigCtrl, [{
          key: "changeParamNo",
          value: function changeParamNo() {
            var new_len = this.current.jsonData.noparams;
            var old_len = this.current.jsonData.param_names.length;
            var max_len = new_len >= old_len ? new_len : old_len;

            for (var i = 0; i < max_len; i++) {
              if (i >= new_len) {
                this.current.jsonData.param_names.splice(i, max_len - i);
                break;
              }
              if (i >= old_len) {
                this.current.jsonData.param_names.push("");
                continue;
              }
            }
          }
        }]);

        return GenericConfigCtrl;
      }());

      _export("GenericConfigCtrl", GenericConfigCtrl);

      GenericConfigCtrl.templateUrl = 'partials/config.html';
    }
  };
});
//# sourceMappingURL=config_ctrl.js.map
