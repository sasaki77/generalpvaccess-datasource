export class GenericAnnotationsQueryCtrl {

  constructor($scope, $injector)  {
    this.scope = $scope;
    this.annotation.param_names = this.datasource.annParam_names;
    this.annotation.param_vals = this.annotation.param_vals || {};
  }

}

GenericAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html'
