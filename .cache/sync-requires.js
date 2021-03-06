const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/vojtechpavelka/Documents/hardwarestore/.cache/dev-404-page.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/vojtechpavelka/Documents/hardwarestore/src/pages/index.js"))),
  "component---src-pages-productform-js": hot(preferDefault(require("/Users/vojtechpavelka/Documents/hardwarestore/src/pages/productform.js")))
}

