import _ from "lodash";

export class GenericDatasource {

  constructor(instanceSettings, $q, backendSrv, templateSrv) {
    this.type = instanceSettings.type;
    this.url = instanceSettings.url;
    this.name = instanceSettings.name;
    this.q = $q;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.withCredentials = instanceSettings.withCredentials;
    this.headers = {'Content-Type': 'application/json'};
    if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) {
      this.headers['Authorization'] = instanceSettings.basicAuth;
    }

    const jsonData = instanceSettings.jsonData || {};

    // PvAccess API settings
    this.noparams = instanceSettings.jsonData.noparams;
    this.enbSearch = instanceSettings.jsonData.enbSearch;
    this.param_names = instanceSettings.jsonData.param_names;
    this.queryCh = instanceSettings.jsonData.queryCh;
    this.annCh = instanceSettings.jsonData.annCh;
    this.searchCh = instanceSettings.jsonData.searchCh;
    this.entityLabel = instanceSettings.jsonData.entityLabel;
    this.startLabel = instanceSettings.jsonData.startLabel;
    this.endLabel = instanceSettings.jsonData.endLabel;
    this.enbNTURI = instanceSettings.jsonData.enbNTURI;
  }

  query(options) {
    var query = this.buildQueryParameters(options);
    query.targets = query.targets.filter(t => !t.hide);

    if (query.targets.length <= 0) {
      return this.q.when({data: []});
    }

    return this.doRequest({
      url: this.url + '/query',
      data: query,
      method: 'POST'
    });
  }

  testDatasource() {
    return this.doRequest({
      url: this.url + '/',
      method: 'GET',
    }).then(response => {
      if (response.status === 200) {
        return { status: "success", message: "Data source is working", title: "Success" };
      }
    });
  }

  annotationQuery(options) {
    var query = this.templateSrv.replace(options.annotation.query, {}, 'glob');
    var annotationQuery = {
      range: options.range,
      annotation: {
        name: options.annotation.name,
        datasource: options.annotation.datasource,
        enable: options.annotation.enable,
        iconColor: options.annotation.iconColor,
        entity: query
      },
      rangeRaw: options.rangeRaw,
      jsonData: { ch: this.annCh,
                  entity_label: this.entityLabel,
                  start_label: this.startLabel,
                  end_label: this.endLabel,
                  nturi_style: this.enbNTURI
      }
    };

    return this.doRequest({
      url: this.url + '/annotations',
      method: 'POST',
      data: annotationQuery
    }).then(result => {
      return result.data;
    });
  }

  metricFindQuery(query) {
    var str = this.templateSrv.replace(query, null, 'regex');

    if (str) {
      var s = str.toString().split('=');
      var target = (s[1] || '');
      var name = (s[0] || '');
    }
    else{
      var target = '';
      var name = '';
    }

    var interpolated = {
        target: target
    };

    interpolated.ch = this.searchCh;
    interpolated.name = name;
    interpolated.nturi_style = this.enbNTURI;

    return this.doRequest({
      url: this.url + '/search',
      data: interpolated,
      method: 'POST',
    }).then(this.mapToTextValue);
  }

  mapToTextValue(result) {
    return _.map(result.data, (d, i) => {
      if (d && d.text && d.value) {
        return { text: d.text, value: d.value };
      } else if (_.isObject(d)) {
        return { text: d, value: i};
      }
      return { text: d, value: d };
    });
  }

  doRequest(options) {
    options.withCredentials = this.withCredentials;
    options.headers = this.headers;

    return this.backendSrv.datasourceRequest(options);
  }

  buildQueryParameters(options) {
    //remove placeholder targets
    options.targets = _.filter(options.targets, target => {
      return target.target !== 'select metric';
    });

    var targets = _.map(options.targets, target => {
      var params = {};
      if (target.param_vals) {
        for (var i = 0, len = this.noparams; i < len; i++) {
          var pn = this.param_names[i];
          var val = this.templateSrv.replace(target.param_vals[pn], options.scopedVars, 'glob');
          params[pn] = val;
        }
      }
      return {
        target: this.templateSrv.replace(target.target, options.scopedVars, 'regex'),
        refId: target.refId,
        hide: target.hide,
        type: target.type || 'timeserie',
        params: params
      };
    });

    options.targets = targets;
    options.jsonData = {ch: this.queryCh,
                        entity_label: this.entityLabel,
                        start_label: this.startLabel,
                        end_label: this.endLabel,
                        nturi_style: this.enbNTURI};

    return options;
  }
}
