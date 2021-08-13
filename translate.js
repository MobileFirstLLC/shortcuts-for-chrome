/**
 * Utility script that converts PO Editor export files to Chrome extension locales files.
 */

const fs = require('fs');
const {join, parse, dirname} = require('path');
const {fromEntries, entries, keys} = Object;

const inDir = './i18n/';
const outDir = './locales/';
const outFile = 'messages.json';
const linksFile = './src/popup/links.json';
const menu = 'MenuLinks';

const hasValue = ([_, value]) => !!value;

const chromeUrl = key => key.indexOf('_') === -1;

const format = ([key, message]) => [key.replace(/[-\/]/g, '_'), {message}];

const log = (file, obj, prop) => console.log(file, keys(prop ? obj[prop] : obj).length);

const locales = json => fromEntries(entries(json).filter(hasValue).map(format));

const links = json => ({[menu]: keys(json).filter(chromeUrl).sort()});

const ensureDir = file => fs.mkdirSync(dirname(file), {recursive: true});

const read = file => JSON.parse(fs.readFileSync(file, 'utf-8'));

const write = (file, obj) => fs.writeFileSync(file, JSON.stringify(obj));

const saveFile = (file, obj, prop) => ensureDir(file) & write(file, obj) & log(file, obj, prop);

const saveLocale = (lang, json) => saveFile(join(outDir, lang, outFile), locales(json));

const saveLinks = (lang, json) => lang !== 'en' || saveFile(linksFile, links(json), menu);

const save = (lang, json) => saveLocale(lang, json) & saveLinks(lang, json);

fs.readdirSync(inDir).map(file => save(parse(file).name, read(join(inDir, file))));
