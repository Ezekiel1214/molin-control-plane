import fs from "fs";
import yaml from "js-yaml";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
const schema = JSON.parse(fs.readFileSync("./tasks.schema.json","utf8"));
const data = yaml.load(fs.readFileSync("./docs/tasks.yaml","utf8")) ?? {};
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);
if (!validate(data)) { console.error(validate.errors); process.exit(1); }
console.log("Schema validation passed.");
