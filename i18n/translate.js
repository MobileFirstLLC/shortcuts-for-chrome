/**
 * Utility script that formats PO Editor files as extension locales files
 */

const fs = require('fs');
const path = require('path');

const inDirectory = './i18n/';
const outDirectory = './assets/locales/';
const outFileName = 'messages.json';
const menuLinksDir = './src/';
const menuLinksFile = 'links.json';

const ensureDirectoryExists = dirPath => fs.existsSync(dirPath) || fs.mkdirSync(dirPath);

const sanitizedKey = key => key.replace(/[-\/]/g, '_');

const isChromeUrl = key => key.indexOf('_') < 0;

const writeJSONFile = (dirPath, filename, obj) => {
    ensureDirectoryExists(dirPath);
    fs.writeFileSync(
        path.join(dirPath, filename),
        JSON.stringify(obj, null, 2)
    );
};

const clearDirectory = directory => {
    for (const file of fs.readdirSync(directory)) {
        const p = path.join(directory, file);

        if (fs.lstatSync(p).isDirectory()) {
            clearDirectory(p);
        } else {
            fs.unlinkSync(p);
        }
    }
};

const writeMenuLinks = content => {
    const keysArray = Object.keys(content);
    const chromeURLs = keysArray.filter(k => isChromeUrl(k)).sort();
    const allLinks = {'MenuLinks': chromeURLs};

    writeJSONFile(menuLinksDir, menuLinksFile, allLinks);
    console.log('Updated menu links: ', chromeURLs.length);
};

for (const file of fs.readdirSync(inDirectory)) {
    if (!file.endsWith('.json')) continue;
    const lang = file.split('.json', 1).shift(),
        inPath = path.join(inDirectory, file),
        outPath = path.join(outDirectory, lang),
        content = JSON.parse(fs.readFileSync(inPath, 'utf-8')),
        obj = {};

    if (lang === 'en') writeMenuLinks(content);

    Object.entries(content)
        .filter(([_, value]) => !!value)
        .map(([key, value]) =>
            (obj[sanitizedKey(key)] = {'message': value}));

    clearDirectory(outPath);
    writeJSONFile(outPath, outFileName, obj);
    console.log(`translated ${lang}:`, Object.keys(obj).length, 'terms');
}
