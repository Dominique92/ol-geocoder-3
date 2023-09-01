import {
  readFileSync, // Read banner file
} from 'fs';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS module into ES module
import css from 'rollup-plugin-import-css'; // Collect css
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser'; // Rollup plugin to minify generated es bundle

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')),
  external = Object.keys(pkg.dependencies),
  globals = {},
  openlayers = [
    ['ol/control/Control', 'ol.control.Control'],
    ['ol/style/Style', 'ol.style.Style'],
    ['ol/style/Icon', 'ol.style.Icon'],
    ['ol/layer/Vector', 'ol.layer.Vector'],
    ['ol/source/Vector', 'ol.source.Vector'],
    ['ol/geom/Point', 'ol.geom.Point'],
    ['ol/proj', 'ol.proj'],
    ['ol/Feature', 'ol.Feature'],
  ];

openlayers.forEach((each) => {
  external.push(each[0]);
  globals[each[0]] = each[1];
});

const banner = readFileSync('./build/banner.js', 'utf-8')
  .replace('${time}', new Date().toUTCString());

export default [{
  // Compressed library
  external,
  input: 'src/base.js',
  plugins: [
    nodeResolve(),
    commonjs(),
    css({
      minify: true,
      output: 'ol-geocoder-min.css',
    }),
    json(),
    terser(),
  ],
  output: [{
    name: 'Geocoder',
    banner,
    globals,
    file: 'dist/ol-geocoder.js',
    format: 'umd',
    sourcemap: true,
  }],
}, {
  // Debug library
  external,
  input: 'src/base.js',
  plugins: [
    nodeResolve(),
    commonjs(),
    css({
      output: 'ol-geocoder.css',
    }),
    json(),
  ],
  output: [{
    name: 'Geocoder',
    banner,
    globals,
    file: 'dist/ol-geocoder-debug.js',
    format: 'iife',
  }],
}];