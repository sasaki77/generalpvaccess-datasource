export class GenericConfigCtrl {

  constructor($scope, $injector)  {
    this.scope = $scope;
    this.current.jsonData.param_names = this.current.jsonData.param_names || [];
  }

  changeParamNo(){
    var new_len = this.current.jsonData.noparams;
    var old_len = this.current.jsonData.param_names.length;
    var max_len = (new_len >= old_len)? new_len : old_len;

    for (var i = 0; i < max_len; i++) {
      if ( i >= new_len ) {
          this.current.jsonData.param_names.splice(i,max_len-1);
          break;
      }
      if ( i >= old_len ) {
          this.current.jsonData.param_names.push("");
          continue;
      }
    }
  }

}

GenericConfigCtrl.templateUrl = 'partials/config.html';
