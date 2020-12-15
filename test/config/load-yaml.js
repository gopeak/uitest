const yaml = require('js-yaml');
const fs = require('fs');
const path = require("path");

export default () => {
    let doc = null;
    try {
        doc = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, '../../') + '/config.test.yml', 'utf8'));
    } catch (e) {}
    return doc
}