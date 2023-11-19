/**
 * Utility script for auto-translating terms using Google Cloud Translate API.
 * It assumes project variables "PROJECT_ID" and "API_KEY" to access the API.
 */
require('dotenv').config();
const fs = require('fs');
const {join, parse} = require('path');
const {Translate} = require('@google-cloud/translate').v2;
const moment = require('moment');

const input = './i18n/';
const refLang = 'en.json';
const API_KEY = process.env.API_KEY;
const projectId = process.env.PROJECT_ID;
const translate = new Translate({projectId, key: API_KEY});
const freezeMin = 60;

/**
 * Read JSON file in the input directory.
 * @param file - file name.
 * @returns {Object}
 */
const read = file =>
    JSON.parse(fs.readFileSync(join(input, file), 'utf-8'));

/**
 * Write a JSON file.
 * @param file - full file name.
 * @param obj - file contents.
 */
const write = (file, obj) => fs.writeFileSync(
    file, JSON.stringify(obj, null, 2));

const skip = (filename) => {
    const ref = parse(refLang).name;
    const tgt = parse(filename).name;
    const mtime = fs.statSync(join(input, filename)).mtime;
    const modDelta = moment().diff(moment(mtime), 'minutes');
    return tgt.startsWith(ref) || modDelta < freezeMin;
};

const main = async (files) => {
    const rlang = read(refLang);
    const sources = files.filter(f => !skip(f));
    const translatable = (tl, target) =>
        Object.entries(rlang).map(([x, def]) =>
            target[x] === def ? x : undefined).filter(x => x);
    const undone = sources.map(file =>
        [file, translatable(parse(file).name, read(file))]
    ).filter((x) => x[1].length > 0);

    if (!undone.length) return console.log('Nothing to translate');
    console.log(undone.map(([f, keys]) => [f, keys.length]));

    const [file, terms] = undone[0];
    const initial = read(file);
    let target = parse(file).name;
    let text = terms.map(t => rlang[t]);
    let [tl] = await translate.translate(text, target);
    tl = Array.isArray(tl) ? tl : [tl];
    const updates = Object.fromEntries(
        tl.map((translation, i) => {
            console.log(`${terms[i]} => ${text[i]} => (${target}) ${translation}`);
            return [terms[i], translation];
        }));
    const final = {...initial, ...updates};
    write(join(input, file), final);
};

main(fs.readdirSync(input));
