import fs from "fs";
import yaml from "js-yaml";
const cfg = yaml.load(fs.readFileSync("./docs/config.yaml","utf8")) ?? {};
const { tasks = [] } = yaml.load(fs.readFileSync("./docs/tasks.yaml","utf8")) ?? {};
const thresholdDays = cfg.staleness_threshold_days ?? 180;
const today = new Date();
const stale = [];
for (const t of tasks) {
  if (t.status !== "published") continue;
  const d = t.last_verified ? new Date(t.last_verified) : null;
  if (!d || Number.isNaN(d.getTime())) { stale.push({ id: t.id, path: t.path, reason: "missing/invalid last_verified" }); continue; }
  const age = Math.floor((today - d) / (1000*60*60*24));
  if (age > thresholdDays) stale.push({ id: t.id, path: t.path, age_days: age });
}
console.log(`Staleness audit (threshold: ${thresholdDays} days)`);
console.log(stale.length ? stale : "No stale items.");
