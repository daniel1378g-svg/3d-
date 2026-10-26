// Share image (1200×630): last frame of the supplied video + the original logotype.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
const frame = fs.readFileSync(path.join(root, "public/videos/poster/final-1920.jpg")).toString("base64");
const logo = fs.readFileSync(path.join(root, "public/brand/logo-a-merendeira.svg"), "utf8");
const html = `<!doctype html><html><body style="margin:0">
<div style="position:relative;width:1200px;height:630px;overflow:hidden;background:#cfcfd0">
  <img src="data:image/jpeg;base64,${frame}" style="position:absolute;left:0;top:-24px;width:1200px">
  <div style="position:absolute;left:0;right:0;top:0;height:150px;background:linear-gradient(#aeadb0,rgba(174,173,176,0))"></div>
  <div style="position:absolute;left:56px;top:46px;width:300px">${logo.replace(/<\?xml[^>]*>/, "")}</div>
</div></body></html>`;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.setContent(html);
  await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(root, "public/og/a-merendeira.jpg"), type: "jpeg", quality: 86 });
  await b.close();
})();
