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

const ensureDir = dirPath => fs.mkdirSync(dirPath, {recursive: true});

const log = (path, obj, prop) => console.log(path, Object.keys(prop ? obj[prop] : obj).length);

const readJson = path => JSON.parse(fs.readFileSync(path, 'utf-8'));

const writeJson = (path, obj, prop) => fs.writeFileSync(path, JSON.stringify(obj)) & log(path, obj, prop);

const write = (dir, file, obj, prop) => ensureDir(dir) & writeJson(path.join(dir, file), obj, prop);

const writeLocale = (lang, obj) => write(path.join(outDir, lang), outFile, obj);

const writeLinks = (lang, links) => lang === 'en' && write(linksDir, linksFile, links, menuLinks);

const linksObj = content => ({[menuLinks]: Object.keys(content).filter(isChromeUrl).sort()});

const localesObj = content => Object.fromEntries(Object.entries(content).filter(hasValue).map(format));

const makeObjects = content => [localesObj(content), linksObj(content)];

const save = (obj, links, lang) => writeLocale(lang, obj) & writeLinks(lang, links);

for (const file of fs.readdirSync(inDir)) {
    save(...makeObjects(readJson(path.join(inDir, file))), path.parse(file).name);
}
