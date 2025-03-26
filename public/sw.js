if (!self.define) {
  let e,
    s = {};
  const n = (n, a) => (
    (n = new URL(n + '.js', a).href),
    s[n] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, i) => {
    const c =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[c]) return;
    let t = {};
    const r = (e) => n(e, c),
      l = { module: { uri: c }, exports: t, require: r };
    s[c] = Promise.all(a.map((e) => l[e] || r(e))).then((e) => (i(...e), t));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/app-build-manifest.json',
          revision: '8c0062172f56ecaf4a1c3ff1e9635bfd',
        },
        {
          url: '/_next/static/8akDYkXX1DVnnsflYxsYO/_buildManifest.js',
          revision: '958cc9b99bcd068341dcd44d496e7bae',
        },
        {
          url: '/_next/static/8akDYkXX1DVnnsflYxsYO/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/1452-be9ad3efd820169e.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/1469-8c70aa974a59fc3d.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/1749-1288d45207e57260.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/1838-42fdc539886653c2.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/1848-ee168e100aaa9be7.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/2079-c292ea0c698f6996.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/2150-1a9750a6ee428e37.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/2488-7449612f4ce6f053.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/2606-0ff31329bf1e6545.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/3429-3be430eeafe25ec2.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/3879-380b68ee54743bcb.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/4402-27279041bdc0982a.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/553-bb0beefa40ad20a5.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/5c2cdd1c.75139ccb0724140f.js',
          revision: '75139ccb0724140f',
        },
        {
          url: '/_next/static/chunks/6392-474a4acdfb932e03.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/7271-f78bb5415d404e6f.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/7761-42b6206c58ec73bc.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/8069-728c17c307b236a6.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/8181-cad75478b8fe783a.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/8536-4f2949ff0974736a.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/8746-ce0dacadc26758c2.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/8792-ff8cbcf05a84dc27.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/8938-2dce20a99e9e18f1.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/954-dd864e6706426604.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/(user-page)/my-meeting/comments/page-27269de5b71eb830.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/(user-page)/my-meeting/layout-9279d4c642c50f94.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/(user-page)/my-meeting/likes/page-083bc5d14328f5b0.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/(user-page)/my-meeting/my/(modal)/profile/page-7958e97699cc964f.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/(user-page)/my-meeting/my/(modal)/user-list/page-1cce8dca252fc924.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/(user-page)/my-meeting/my/@modal/(.)profile/page-f09c799717621547.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/(user-page)/my-meeting/my/@modal/(.)user-list/page-60ee0da18c779ff3.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/(user-page)/my-meeting/my/@modal/default-51540fbde71b99a2.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/(user-page)/my-meeting/my/@modal/page-d071574356e12a27.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/(user-page)/my-meeting/my/layout-b6e947a3add54afc.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/(user-page)/my-meeting/my/page-c6a4be7ada4a9d53.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/(user-page)/mypage/page-0a921c16fc1ae073.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/install-pwa/page-c37a19e589f1c78e.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/layout-eeed5783da2652c2.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/login/page-842ddcd76b8990e8.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/meeting/%5Bcategory%5D/%5Bid%5D/page-298c41908ee6e3ef.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/meeting/%5Bcategory%5D/(modal)/%5Bid%5D/%5Bstatus%5D/page-0dc08689cde06e4b.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/meeting/%5Bcategory%5D/(modal)/need-login/page-0b733ea2edd6b6bc.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/meeting/%5Bcategory%5D/@modal/%5Bid%5D/(.)APPROVED/page-18546543f0694173.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/meeting/%5Bcategory%5D/@modal/%5Bid%5D/(.)CANCEL/page-c4571f4b0f3812a7.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/meeting/%5Bcategory%5D/@modal/%5Bid%5D/(.)PENDING/page-90585f93a435ed18.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/meeting/%5Bcategory%5D/@modal/%5Bid%5D/(.)QUIT/page-e0de2702457762dd.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/meeting/%5Bcategory%5D/@modal/%5Bid%5D/(.)intro-input/page-385b0b2995aa18ba.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/meeting/%5Bcategory%5D/@modal/%5Bid%5D/(.)need-login/page-3464b9de6a4d5068.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/meeting/%5Bcategory%5D/@modal/%5Bid%5D/(.)register/page-7a29ee9bb0f495fc.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/meeting/%5Bcategory%5D/@modal/%5Bid%5D/page-d878b8164d1934ec.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/meeting/%5Bcategory%5D/@modal/(.)need-login/page-a64960178ab9a6c3.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/meeting/%5Bcategory%5D/@modal/default-3f99db2ffdc04767.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/meeting/%5Bcategory%5D/layout-70c3392661353f46.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/meeting/%5Bcategory%5D/page-d242011f32f0685b.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/meeting/create-meeting/page-df910f853b67b01d.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/meeting/edit-meeting/%5Bid%5D/page-33613d440552d417.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/not-found-ffe7d72b90390eb7.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/page-c62eaa692d83ec4b.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/preview/button/page-3c1cee50255f1b0c.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/preview/card/page-03af16371d140ece.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/preview/chip/page-dd72cb198a220e5b.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/preview/dropdown/page-6ab31f380e201711.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/preview/gnb/page-f7c74413bc55c129.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/preview/input/page-9267f3fc1db51b0c.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/preview/modal/page-6f199cb6d153ced3.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/preview/progress/page-9c839f92c1682ca0.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/preview/review/page-8ca6f77833c235ab.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/preview/tag/page-abd26e3e21b6b7cf.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/preview/tech-stack/page-5f4e7b14bfac49d5.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/preview/tech-stack3/page-eb29d3f5dd434d46.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/preview/toast/page-e2a25a2c4b28c400.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/signup/page-8f2db219dc07c034.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/app/test/page-2c87f6db9cfa1aed.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/fd9d1056-700e5c63d6c4ece9.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/framework-8e0e0f4a6b83a956.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/main-0ae8be983044bf8d.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/main-app-986756eb1ef5d008.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/pages/_app-57bdff7978360b1c.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/pages/_error-29037c284dd0eec6.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        {
          url: '/_next/static/chunks/webpack-8bfefdb2098f84df.js',
          revision: '8akDYkXX1DVnnsflYxsYO',
        },
        {
          url: '/_next/static/css/bb75c1bfc16f7c4d.css',
          revision: 'bb75c1bfc16f7c4d',
        },
        {
          url: '/_next/static/media/ff840cfebfb63b0c-s.p.woff2',
          revision: '302ec55f5b4320354ec6b35a53dead87',
        },
        {
          url: '/basketball.png',
          revision: '38601278466b30b40fc0ccc7927ec123',
        },
        { url: '/beige_cat.png', revision: 'daa92c5cfff5bc84f08461954f77d70e' },
        {
          url: '/cat_profile.png',
          revision: '53f61ed66c5307987349a29fbf41c691',
        },
        { url: '/deving.svg', revision: 'cbcc90c6280fe96c503bd5e56b4b5ea3' },
        {
          url: '/front_notebook.png',
          revision: '46838760bd152a9ef6f57261be7251a5',
        },
        { url: '/github.svg', revision: 'a9dae2f2796cbfe9c2c383213838feff' },
        { url: '/gray_cat.png', revision: 'f7b0004fd139b8a57f4be83b198fadf4' },
        { url: '/headset.png', revision: 'e13dbe7e245c220dd1bbf88e02f4b1ec' },
        {
          url: '/heart_notebook.png',
          revision: 'b581afdb79ab06c4b768664230277039',
        },
        { url: '/hobby_cat.png', revision: '0bc508a13c3650550cc0f528ecfa21c6' },
        {
          url: '/icons/logo_192.png',
          revision: '58008fc7e31adc5a076e838f0604ccc0',
        },
        {
          url: '/icons/logo_256.png',
          revision: '4e38b801925f84bd190715b446d81287',
        },
        {
          url: '/icons/logo_384.png',
          revision: 'a5a66784a912f2a924d1727d5bdf921d',
        },
        {
          url: '/icons/logo_512.png',
          revision: 'f3a2d02c3d43bbd08ac35ebc32d97092',
        },
        {
          url: '/landingLogo.svg',
          revision: 'e1283634ec356c2bc64c6f2ddf9066ca',
        },
        { url: '/logo.svg', revision: '9fca17e6b57dfa6b8a472c595e45a174' },
        { url: '/main.png', revision: '7ebd890addf997cb57af7ea94b461432' },
        { url: '/manifest.json', revision: 'ce4a35d722d8081f20a3c5dcfa87a1fe' },
        {
          url: '/mogakco_cat.png',
          revision: '9c19a8f44acccf5fd158eba4921699e1',
        },
        { url: '/notion.svg', revision: '59d4931cb6ed54235e78f9929179fda8' },
        { url: '/read_cat.png', revision: 'dc30958e7c3b41f28171cc79a68ec287' },
        { url: '/section1.png', revision: '7ebd890addf997cb57af7ea94b461432' },
        { url: '/section2.png', revision: '9de83b72095c71e9787b0d4741088bc8' },
        {
          url: '/side-project_cat.png',
          revision: '18d34d4c0e0ad124b10b4fb676c81a08',
        },
        { url: '/thumbnail.jpg', revision: '17b6b21afec1f0d84d87108ea1136d25' },
        { url: '/white_cat.png', revision: '9e3bd0a270c28a1a544f6e5b83c172c4' },
        {
          url: '/white_notebook_cat.png',
          revision: '29b80e08dbc12874e5aa37c3d95a3f7e',
        },
        {
          url: '/yellow_cat.png',
          revision: '444e17dce246d4905c8e5f6f85f5c47d',
        },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: n,
              state: a,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET',
    );
});
