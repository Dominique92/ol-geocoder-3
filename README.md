# OpenLayers Control Geocoder
<a href="https://github.com/Dominique92/ol-geocoder/blob/master/LICENSE">
  <img src="https://img.shields.io/npm/l/ol-geocoder.svg" alt="license">
</a>
A geocoder extension for [OpenLayers](http://openlayers.org/) v8.0.0++.
based on [jonataswalker/ol-geocoder](https://github.com/jonataswalker/ol-geocoder)
and [kirtan-desai/ol-geocoder](https://github.com/kirtan-desai/ol-geocoder)
that is no longer maintained today.
 
## Demos

* [Example using OSM nominatim provider](https://dominique92.github.io/ol-geocoder/examples/control-nominatim.html)
* [Example using glass button & photon provider](https://dominique92.github.io/ol-geocoder/examples/control-glass.html)
* [Example using a custom provider](https://dominique92.github.io/ol-geocoder/examples/custom-provider.html)
* [Example with the control outside of the map](https://dominique92.github.io/ol-geocoder/examples/external-div.html)

## Providers

The plugin supports (for now) the following providers:

* [OSM](https://www.openstreetmap.org/)/[Nominatim](https://nominatim.org/) &mdash; `'osm'`.
* [MapQuest Geocoding API](https://developer.mapquest.com/documentation/open/nominatim-search/) &mdash; requires KEY  &mdash; `'mapquest'`.
* [Photon](https://photon.komoot.io/)  &mdash; `'photon'`.
* [Bing](https://docs.microsoft.com/en-us/bingmaps/rest-services/) &mdash; requires KEY  &mdash; `'bing'`.
* [OpenCage](https://opencagedata.com/) &mdash; requires KEY  &mdash; `'opencage'`.

### Custom Providers

You can also write your own provider, passing an instance of it to the `Geocoder` constructor
via the `provider` property of the options argument.

For an example of defining and using a custom provider see [`examples/custom-provider.js`](examples/custom-provider.js)

Custom providers must implement the following methods:

#### `getParameters(options)`

* `options` `{Object}`
    * `query` Search string entered by the user;
    * `lang` `{string}` Preferable language;
    * `limit` `{number}` Limit of results;

#### `handleResponse(results)`

* `results` `{Object}` Parsed JSON response from API call

## How to use it?

##### Download package

Download the full build & sources [ZIP file](https://github.com/Dominique92/ol-geocoder/archive/refs/heads/main.zip)
from [Dominique92/ol-geocoder](https://github.com/Dominique92/ol-geocoder) & use it in your project.

##### GITHUB Hosted
If you want to try out ol-geocoder without downloading anything (not recommended for production),
include the following in the head of your html page:
```
    <link rel="stylesheet" href="https://dominique92.github.io/ol-geocoder/dist/ol-geocoder.css">
    <script src="https://dominique92.github.io/ol-geocoder/dist/ol-geocoder.js"></script>
```

##### NPM Hosted

To be developped

##### CDN Hosted

To be developped

##### Instantiate with some options and add the Control
```javascript
var geocoder = new Geocoder('nominatim', {
  provider: 'mapquest',
  url: 'https://nominatim.openstreetmap.org/search',
  key: '__some_key__',
  lang: 'pt-BR', //en-US, fr-FR
  placeholder: 'Search for ...',
  targetType: 'text-input',
  limit: 5,
  keepOpen: true
});
map.addControl(geocoder);
```

##### Listen and do something when an address is chosen
```javascript
geocoder.on('addresschosen', function(evt){
  var feature = evt.feature,
      coord = evt.coordinate,
      address = evt.address;
  // some popup solution
  content.innerHTML = '<p>'+ address.formatted +'</p>';
  overlay.setPosition(coord);
});
```

# API

## Constructor

#### `new Geocoder(type, options)`

- `type` `{String}` - Maybe later we will have other types like `'reverse'`. So for now just pass `'nominatim'`.

- `options` is an object with the following possible properties:
  * `provider`             : `'osm'` (default), `'mapquest'`, `'photon'`, `'pelias'`, `'bing'`, `'opencage'`, custom provider instance; Your preferable provider;
  * `url`                  : `'https://nominatim.openstreetmap.org/search''`; API provider url;
  * `key`                  : `''`; API Key if required;
  * `autoComplete`         : `false`; Search as you type;
  * `autoCompleteMinLength`: `2`; The minimum number of characters to trigger search;
  * `autoCompleteTimeout`  : `200`; The mimimum number of ms to wait before triggering search if autoComplete is on and minimum number of characters is satisfied;
  * `placeholder`          : `'Search for an address'`; Placeholder for text input;
  * `targetType`           : `'glass-button'`; Can also be `'text-input'`;
  * `featureStyle`         : `ol.style.Style`; Feature style;
  * `lang`                 : `'en-US'`; Preferable language;
  * `limit`                : `5`; Limit of results;
  * `countrycodes`         : `''`; Only valid for `osm` and `mapquest`; Limit search results to a specific country (or a list of country codes separated with commas `FR,US`). This is an [ISO 3166-1alpha2 code] (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), e.g. `gb` for the United Kingdom, `br` for Brazil, etc;
  * `viewbox`              : `''`; The preferred area to find search results. Any two corner points of the box are accepted as long as they span a real box. '<x1>,<y1>,<x2>,<y2>' x is longitude, y is latitude (EPSG:4326);
  * `keepOpen`             : `false`; Whether the results keep openned;
  * `preventDefault`       : `false`; When true, prevent panning and creating marker when an address is chosen;
  * `preventPanning`       : `false`; When true, prevent panning, but create marker, when an address is chosen;
  * `preventMarker`        : `false`; When true, prevent creating marker, but provide panning, when an address is chosen;
  * `defaultFlyResolution` : `1`; (meters per pixel) resolution to fly to when only coords & not extent is returned by the provider;
  * `debug`                : `false`; If true logs provider's response;
  * ... any option of [ol.control.Control](https://openlayers.org/en/latest/apidoc/module-ol_control_Control-Control.html#Control)

## Instance Methods

#### `getLayer()`
Returns the layer `{ol.layer.Vector}` created by Geocoder control.

#### `getSource()`
Returns the source `{ol.source.Vector}` created by Geocoder control.

#### `setProvider(provider)`

`@param {String} provider`

Sets a new provider.

#### `setProviderKey(key)`

`@param {String} key`

Sets provider key.

## Events

##### Triggered when an address is chosen
```javascript
geocoder.on('addresschosen', function(evt) {
  // it's up to you
  console.info(evt);
});
```
