/**
 * This utility script converts CSV file to localized dictionaries
 */

const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const locales = {}, keys = [];
const input = './assets/dictionary.csv';
const outPath = './assets/locales/';
const outFileName = 'messages.json';
let menuLinksStartRow = false, rowCounter = 0;

const ensureDir = function (dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
};

const writeFile = function (path, filename, obj) {
    const content = JSON.stringify(obj, null, 2);

    ensureDir(path);
    fs.writeFileSync(path + '/' + filename, content);
};

const clearDirectory = function (directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const p = path.join(directory, file);

        if (fs.lstatSync(p).isDirectory()) {
            clearDirectory(p);
        } else {
            fs.unlinkSync(p);
        }
    }
};

fs.createReadStream(input)
    .pipe(csv())

    // read CSV data one row at a time
    .on('data', (row) => {

        // first row contains column keys i.e. language codes
        if (rowCounter === 0) {
            Object.keys(row)
                .filter(k => k !== 'key')
                // create dictionary for each language
                .map(k => {
                    locales[k] = {};
                });
        }

        // subsequent rows contain data
        if (rowCounter > 0 && row.key) {

            // remove invalid chars from i18n dictionary key
            const k = row.key
                .replace(/-/g, '_')
                .replace(/\//g, '_');

            // add dictionary entry for each language, if localized value exists
            Object.keys(locales).map(locale => {
                if (row[locale]) locales[locale][k] = {'message': row[locale]};
            });

        }

        // use empty row to indicate start of menu links
        if (rowCounter > 1 && !row.key) {
            menuLinksStartRow = true;
        }

        // record all entries that represent links in their original form
        if (menuLinksStartRow && row.key) {
            keys.push(row.key);
        }

        rowCounter++;
    })

    // after reading all CSV rows
    .on('end', _ => {

        clearDirectory(outPath);

        // generate updated language dictionaries
        Object.keys(locales)
            // only take non-empty dictionaries
            .filter(k => (k && Object.values(locales[k]).length))
            // write locales directories
            .map(language => writeFile(outPath + language, outFileName, locales[language]));

        // write all links to file for use by source
        writeFile('./src/', 'links.json', {'MenuLinks': keys});

        console.log(` CSV file processed successfully with ${keys.length} links`);
        console.log(' Check that xt-build.locales_list matches ' + outPath + '\n');

    });
