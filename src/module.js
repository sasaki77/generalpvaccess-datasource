import {GenericDatasource} from './datasource';
import {GenericDatasourceQueryCtrl} from './query_ctrl';
import {GenericConfigCtrl} from './config_ctrl';
import {GenericAnnotationsQueryCtrl} from './annotation_ctrl';

class GenericQueryOptionsCtrl {}
GenericQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

export {
  GenericDatasource as Datasource,
  GenericDatasourceQueryCtrl as QueryCtrl,
  GenericConfigCtrl as ConfigCtrl,
  GenericQueryOptionsCtrl as QueryOptionsCtrl,
  GenericAnnotationsQueryCtrl as AnnotationsQueryCtrl
};
