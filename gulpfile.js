const gulp = require('gulp')
const workboxBuild = require('workbox-build');

gulp.task('build-sw', done => {
  return workboxBuild.generateSW({
    cacheId: 'version-1',
    globDirectory: './functions/public',
    navigateFallback: '/index.html',
    navigateFallbackWhitelist: [
      [/^(?!(\/__)|(\/service-worker\.js)|(\/sw\.js)|(\/routing-sw\.js)|(\/_bundle-sizes\.html)|(\/_statistic\.html)|(\/_statistic\.json))/]
    ],
    swDest: './functions/public/sw.js',
    // https://www.gstatic.com/firebasejs/
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/maps.googleapis.com\/.*/,
        handler: 'networkFirst'
      },
      {
        urlPattern: /^https:\/\/raw.githubusercontent.com\/.*/,
        // urlPattern: /^https:\/\/polyfill.io\/.*/,
        handler: 'networkFirst'
      },
      {
        urlPattern: /^https:\/\/fonts.googleapis.com\/.*/,
        handler: 'cacheFirst'
      },
      {
        urlPattern: /^https:\/\/fonts.gstatic.com\/.*/,
        handler: 'cacheFirst'
      },
      {
        urlPattern: /^https:\/\/cdn.ravenjs.com\/.*/,
        handler: 'cacheFirst'
      },
      {
        urlPattern: /^https:\/\/www.gstatic.com\/firebasejs\/.*/,
        handler: 'cacheFirst'
      },
      {
        urlPattern: /^https:\/\/www.google-analytics.com\/analytics.js/,
        handler: 'networkFirst'
      },
      {
        urlPattern: /^https:\/\/polyfill.io\/.*/,
        handler: 'networkFirst'
      }
    ]
  })
  .then(() => {
    console.log('Service worker generated.');
    // done()
  });
  
})