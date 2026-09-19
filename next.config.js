/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Next.js 15.5's dev-only "Segment Explorer" devtool intermittently fails to
    // resolve its own module (segment-explorer-node.js#SegmentViewNode) in the
    // React Client Manifest, throwing `__webpack_modules__[moduleId] is not a
    // function` and returning a 500 for `/`. The browser then surfaces the failed
    // navigation as a DOM Event that serializes to `{"isTrusted":true}`. Disabling
    // this devtool removes the faulty injection without affecting the app.
    devtoolSegmentExplorer: false,
  },
}

module.exports = nextConfig
