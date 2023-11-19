/**
 * Utility script that converts PO Editor export files to Chrome extension locales files.
 * It also generates the links.json used to build the popup menu.
 */

const fs = require('fs');
const {join, parse, dirname} = require('path');

const inDir = './i18n/';
const out = './locales/';
const fn = 'messages.json';
const linksFile = './src/auto_generated/links.json';

// eslint-disable-next-line no-unused-vars
const hasValue = ([_, value]) => !!value.length;

const chromeUrl = key => key.indexOf('_') === -1;

const format = ([key, message]) => [key.replace(/[-/]/g, '_'), {message}];

const locales = json => Object.fromEntries(Object.entries(json).filter(hasValue).map(format));

const links = json => ({['MenuLinks']: Object.keys(json).filter(chromeUrl).sort()});

const ensureDir = file => fs.mkdirSync(dirname(file), {recursive: true});

const read = file => JSON.parse(fs.readFileSync(file, 'utf-8'));

const write = (file, obj) => ensureDir(file) && fs.writeFileSync(file, JSON.stringify(obj));

const save = (n, fn, json) => (n || write(linksFile, links(json))) & write(fn, locales(json));

const translate = (file, n) => save(n, join(out, parse(file).name, fn), read(join(inDir, file)));

const processFiles = files => files.map(translate) && console.log(files.length, 'locales formatted');

processFiles(fs.readdirSync(inDir));
