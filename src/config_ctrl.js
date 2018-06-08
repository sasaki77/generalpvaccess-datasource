export class GenericConfigCtrl {

  constructor($scope, $injector)  {
    this.scope = $scope;
    this.current.jsonData.noparams = this.current.jsonData.noparams || 0;
    this.current.jsonData.param_names = this.current.jsonData.param_names || [];
    this.current.jsonData.entityLabel = this.current.jsonData.entityLabel || "entity";
    this.current.jsonData.startLabel = this.current.jsonData.startLabel || "starttime";
    this.current.jsonData.endLabel = this.current.jsonData.endLabel || "endtime";
    this.current.jsonData.enbNTURI = this.current.jsonData.enbNTURI || false;
  }

  changeParamNo(){
    var new_len = this.current.jsonData.noparams;
    var old_len = this.current.jsonData.param_names.length;
    var max_len = (new_len >= old_len)? new_len : old_len;

    for (var i = 0; i < max_len; i++) {
      if ( i >= new_len ) {
          this.current.jsonData.param_names.splice(i,max_len-i);
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
