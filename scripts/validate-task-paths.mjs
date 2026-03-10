import fs from "fs";
import path from "path";
import yaml from "js-yaml";
const BUILD_DIR = process.env.DOCS_BUILD_DIR ?? "./build";
const BASE_URL = (process.env.DOCS_BASE_URL ?? "/").replace(/\/+$/, "") || "/";
const { tasks = [] } = yaml.load(fs.readFileSync("./docs/tasks.yaml","utf8")) ?? {};
const normalizePath = (p) => { if (!p) return null; const c = String(p).split("#")[0].split("?")[0]; return c.startsWith("/") ? c : `/${c}`; };
const stripBaseUrl = (p) => { const c = normalizePath(p); if (!c) return null; if (BASE_URL !== "/" && c === BASE_URL) return "/"; if (BASE_URL !== "/" && c.startsWith(BASE_URL + "/")) return c.slice(BASE_URL.length); return c; };
const candidatesFor = (p) => { const c = stripBaseUrl(p); if (!c) return []; const rel = c.replace(/^\/+/, ""); if (!rel) return [path.join(BUILD_DIR, "index.html")]; return [path.join(BUILD_DIR, rel, "index.html"), path.join(BUILD_DIR, `${rel}.html`)]; };
const exists = (p) => candidatesFor(p).some((f) => fs.existsSync(f));
const errors = [];
for (const t of tasks) {
  if (t.status !== "published") continue;
  if (!exists(t.path)) errors.push(`Missing: ${t.path} (task: ${t.id})`);
  for (const r of t.related || []) if (!exists(r)) errors.push(`Missing related: ${r} (task: ${t.id})`);
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("Paths verified.");
