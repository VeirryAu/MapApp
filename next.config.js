const withLess = require('@zeit/next-less')
const NextWorkboxPlugin = require('next-workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const path = require('path')

module.exports = withLess({
  webpack (config, { isServer, buildId, dev }) {
    const workboxOptions = {
      clientsClaim: true,
      skipWaiting: true,
      globPatterns: ['.next/static/*', '.next/static/commons/*'],
      modifyUrlPrefix: {
        '.next': '/_next'
      },
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst',
          options: {
            cacheName: 'html-cache'
          }
        },
        {
          urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'image-cache',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }

    if (!isServer && !dev) {
      config.plugins.push(
        new NextWorkboxPlugin({
          buildId,
          ...workboxOptions
        }),
        new WebpackPwaManifest({
          filename: 'static/manifest.json',
          name: 'MapApp',
          short_name: 'MapApp',
          lang: 'id-ID',
          description: 'MapApp - Cari lokasi tong sampah terdekat',
          display: 'standalone',
          orientation: 'portrait',
          fingerprints: false,
          start_url: '/',
          background_color: '#fafafa',
          theme_color: '#0288D1',
          inject: true,
          icons: [
            {
              src: path.resolve('static/icon-512x512.png'),
              sizes: [72, 96, 120, 128, 144, 152, 167, 180, 192, 384, 512]
            },
            {
              src: path.resolve('static/icon-512x512.png'),
              sizes: [120, 152, 167, 180],
              ios: true
            }
          ],
          ios: {
            'apple-mobile-web-app-title': 'MapApp',
            'apple-mobile-web-app-status-bar-style': '#0288D1'
          },
          includeDirectory: true,
          publicPath: '..'
        })
      )
    }

    return config
  }
})
