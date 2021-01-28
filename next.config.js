const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
//const { env } = require('../configuration.js')
module.exports = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.html$/i,
            loader: 'html-loader',
        });
        config.plugins.push(
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            })
        );

        // config.module.rules.push({
        //     test: /\.(scss|sass|css)$/i,
        //     use: ExtractTextPlugin.extract({
        //         fallback: 'style-loader',
        //         use: [
        //             { loader: 'css-loader', options: { minimize: process.env.NODE_ENV === 'production' } },
        //             { loader: 'postcss-loader', options: { sourceMap: true } },
        //             'resolve-url-loader',
        //             { loader: 'sass-loader', options: { sourceMap: true } }
        //         ]
        //     })
        // })
        return config;
    },
}



// const withSass = require('@zeit/next-sass')
// const withCSS = require('@zeit/next-css')
// module.exports = withCSS({});
//module.exports = require('@zeit/next-typescript')()
// const withFonts = require('nextjs-fonts');
// module.exports = withFonts();

// module.exports = withCSS(withSass({
//   webpack (config, options) {
//     config.module.rules.push({
//       test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
//       use: {
//         loader: 'url-loader',
//         options: {
//           limit: 100000
//         }
//       }
//     })

//     return config
//   }
// }))



// withTypescript(withCSS(withSass(opts))) works on production mode, fails on dev mode
// withSass(withTypescript(withCSS(opts))) works on dev mode, fais on production mode