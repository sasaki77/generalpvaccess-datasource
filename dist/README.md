# General pvAccess Datasource

Visualize EPICS pvAccess RPC data on Grafana. This plugin based on [simple-json-datasource](https://github.com/grafana/simple-json-datasource)

See [EPICS site](https://epics.anl.gov/) for pvAccess RPC information.

## Features
- pvAccess RPC channel names for query, annotations and search are passed from datasource configuration panel
- Configurable query parameters for each datasource
- Show timeseries data and table data

## Installation

Clone this plugin into grafana plugins directory; the default is /var/lib/grafana/plugins.

## Backend Implementation

Your backend needs to implement 4 urls:

- `/` should return 200 ok. Used for "Test connection" on the datasource config page.
- `/query` should return metrics based on input.
- `/annotations` should return annotations.
- `/search` used by the find metric options on the query tab in panels (optional).

## Example backend implementation

- https://github.com/sasaki77/gfhttpva

### Query API

Example `timeserie` request
``` javascript
{
  "panelId": 1,
  "range": {
    "from": "2018-05-15T01:12:07.045Z",
    "to": "2018-05-15T07:12:07.045Z",
    "raw": {
      "from": "now-6h",
      "to": "now"
    }
  },
  "rangeRaw": {
    "from": "now-6h",
    "to": "now"
  },
  "interval": "1m",
  "intervalMs": 60000,
  "targets": [
    { "target": "sine", "refId": "A", "type": "timeserie", "params": {"foo": "bar"} },
    { "target": "cos", "refId": "B", "type": "timeserie", "params": {"foo": "bar"} }
  ],
  "maxDataPoints": 399,
  "jsonData": {
    "ch": "PVACCESS:RPC:CH:NAME",
    "start_label": "starttime",
    "end_label": "endtime",
    "entity_label": "entity",
    "nturi_style": false
  }
}
```

Example `timeserie` response
``` javascript
[
  {
    "target": "sine" // The field being queried for
    "datapoints": [
      [ 0, 1526346727000 ], // Metric value as a float , unixtimestamp in milliseconds
      [ 0.01745240643728351, 1526346748000 ],
      [ 0.03489949670250097, 1526346769000 ]
    ],
  },
  {
    "target": "cos"
    "datapoints": [
      [ 1, 1526346727000 ],
      [ 0.9998476951563913, 1526346748000 ],
      [ 0.9993908270190958, 1526346769000 ]
    ],
  }
]
```

If the metric selected is `"type": "table"`, an example `table` response:
```json
[
  {
    "columns":[
      {"text":"value","type":"number"},
      {"text":"seconds"},
      {"text":"nanoseconds"}
      {"text":"status"}
      {"text":"severity"}
    ],
    "rows":[
      [1.1, 1460589140, 16235768, 0, 0],
      [1.2, 1460589141, 164235245, 0, 0],
      [2.0, 1460589142, 164235256, 1, 3]
    ],
    "type":"table"
  }
]
```

### Annotation API

The annotation request from the generalpvaccess-datasource is a POST request to
the /annotations endpoint in your datasource. The JSON request body looks like this:
``` javascript
{
  "range": {
    "from": "2018-05-15T01:10:56.578Z",
    "to": "2018-05-16T01:10:56.578Z",
  },
  "rangeRaw": {
    "from": "now-24h"
    "to": "now",
  },
  "annotation": {
    "name": "foo",
    "datasource": "foo datasource",
    "iconColor": "rgba(255, 96, 96, 1)",
    "enable": true,
    "ch": "PVACCESS:RPC:CH:NAME",
    "entity": "bar"
  }
  "jsonData": {
    "start_label": "starttime",
    "end_label": "endtime",
    "entity_label": "entity",
    "nturi_style": false
  }
}
```

Grafana expects a response containing an array of annotation objects in the
following format:

``` javascript
[
  {
    annotation: annotation, // The original annotation sent from Grafana.
    time: time, // Time since UNIX Epoch in milliseconds. (required)
    title: title, // The title for the annotation tooltip. (required)
    tags: tags, // Tags for the annotation. (optional)
    text: text // Text for the annotation. (optional)
  }
]
```

Note: If the datasource is configured to connect directly to the backend, you
also need to implement an OPTIONS endpoint at /annotations that responds
with the correct CORS headers:

```
Access-Control-Allow-Headers:accept, content-type
Access-Control-Allow-Methods:POST
Access-Control-Allow-Origin:*
```

### Search API

Example request
``` javascript
{"ch": "PVACCESS:RPC:CH:NAME", "target": "sine", "name": "entity", "nturi_style": false}
```

The search api can either return an array or map.

Example array response
``` javascript
["sine","cos"]
```

Example map response
``` javascript
[ { "text" :"sine", "value": 1}, { "text" :"cos", "value": 2} ]
```

### Dev setup

This plugin requires node 6.10.0

`npm install -g yarn`
`yarn install`
`npm run build`
