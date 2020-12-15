const csv = require('csv-parser');
const fs = require('fs');

let counter = 0;
const locales = {};

const createDir = function (dirPath) {
    // doesn't exist
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        return true;
    }
    // check if empty
    return !fs.readdirSync(dirPath).length;
};

const writeFile = function (filePath, content) {
    fs.writeFileSync(filePath, content);
};

fs.createReadStream('./assets/language.csv')
    .pipe(csv())
    .on('data', (row) => {
        if (counter === 0) {
            Object.keys(row).filter(k => k !== 'key').map(k => {
                locales[k] = {};
            });
        }
        if (counter >= 1) {
            const k = row.key
                .replace(/-/g, '_')
                .replace(/\//g, '_');

            Object.keys(locales).map(loc => {
                if (row[loc] || counter === 1) {
                    locales[loc][k] = {'message': row[loc] || row['en']};
                }
            });
        }
        counter++;
    })
    .on('end', () => {
        Object.keys(locales).map(k => {
            if (k) {
                createDir(`./assets/locales/${k}`);
                writeFile(`./assets/locales/${k}/messages.json`,
                    JSON.stringify(locales[k], null, 2));
            }
        });
        console.log('CSV file successfully processed');
    });
