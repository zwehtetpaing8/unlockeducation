const esbuild = require('esbuild');
const fs = require('fs');

const code = `
const React = require('react');
const { Chap4_Fig15 } = require('./dist/assets/index-B_-oswSE.js'); // Wait, the bundle doesn't export Chap4_Fig15 directly probably...
`;
