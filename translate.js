/**
 * Utility script that formats PO Editor files as extension locales files
 */

const fs = require('fs');
const path = require('path');

const inDir = './i18n/';
const outDir = './locales/';
const outFile = 'messages.json';
const linksDir = './src/popup/';
const linksFile = 'links.json';
const menuLinks = 'MenuLinks';

const hasValue = ([_, value]) => !!value;

const isChromeUrl = key => key.indexOf('_') < 0;

const format = ([key, message]) => [key.replace(/[-\/]/g, '_'), {message}];

const linksObj = json => ({[menuLinks]: Object.keys(json).filter(isChromeUrl).sort()});

const localesObj = json => Object.fromEntries(Object.entries(json).filter(hasValue).map(format));

const makeObjects = json => [localesObj(json), linksObj(json)];

const log = (path, obj, prop) => console.log(path, Object.keys(prop ? obj[prop] : obj).length);

const ensureDir = dir => fs.mkdirSync(dir, {recursive: true});

const readJson = path => JSON.parse(fs.readFileSync(path, 'utf-8'));

const saveJson = (path, obj, prop) => fs.writeFileSync(path, JSON.stringify(obj)) & log(path, obj, prop);

const write = (dir, file, obj, prop) => ensureDir(dir) & saveJson(path.join(dir, file), obj, prop);

const saveLinks = (lang, links) => lang === 'en' && write(linksDir, linksFile, links, menuLinks);

const saveLocale = (lang, obj) => write(path.join(outDir, lang), outFile, obj);

const save = (lang, [obj, links]) => saveLocale(lang, obj) & saveLinks(lang, links);

for (const file of fs.readdirSync(inDir)) {
    save(path.parse(file).name, makeObjects(readJson(path.join(inDir, file))));
}
