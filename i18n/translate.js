/**
 * Utility script that formats PO Editor files as extension locales files
 */

const fs = require('fs');
const path = require('path');

const inDirectory = './i18n/';
const outDirectory = './assets/locales/';
const outFileName = 'messages.json';
const firstLink = 'accessibility';
const menuLinksDir = './src/';
const menuLinksFile = 'links.json';

const ensureDirectoryExists = (dirPath) => fs.existsSync(dirPath) || fs.mkdirSync(dirPath);

const sanitizedKey = key => key.replace(/[-\/]/g, '_');

const writeJSONFile = function (dirPath, filename, obj) {
    ensureDirectoryExists(dirPath);
    fs.writeFileSync(
        path.join(dirPath, filename),
        JSON.stringify(obj, null, 2)
    );
};

const clearDirectory = function (directory) {
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
    const allLinks = {'MenuLinks': keysArray.splice(keysArray.indexOf(firstLink))};

    writeJSONFile(menuLinksDir, menuLinksFile, allLinks);
    console.log('Updated menu links: ', Object.keys(allLinks.MenuLinks).length);
};

for (const file of fs.readdirSync(inDirectory)) {
    if (file.indexOf('.json') < 0) continue;
    const lang = file.split('.json', 1).shift(),
        inPath = path.join(inDirectory, file),
        outPath = path.join(outDirectory, lang),
        content = JSON.parse(fs.readFileSync(inPath, 'utf-8')),
        obj = {};

    if (lang === 'en') writeMenuLinks(content);

    Object.keys(content)
        .filter(key => content[key])
        .map(key => (obj[sanitizedKey(key)] = {'message': content[key]}));

    clearDirectory(outPath);
    writeJSONFile(outPath, outFileName, obj);
    console.log(`translated ${lang}:`, Object.keys(obj).length, 'terms');
}
