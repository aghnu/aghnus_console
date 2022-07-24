const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const sitemap = require('./src/template/data/sitemap.json');

const sitemapPath = sitemap.paths.map((path) => {
    
    const pathReturn = path;
    if (path.lastmod === 'today') {
        const date = new Date();
        pathReturn.lastmod = date.toString();
    }

    return pathReturn;
});

module.exports = merge(common, {
    mode: 'production',

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'site/assets/'),
    },
  
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/template/index.liquid'
        }),
        new HtmlWebpackPlugin({
            filename: '../404.html',
            template: './src/template/404.liquid',
            inject: false
        }),
        new SitemapPlugin({
            base: sitemap.origin,
            paths: sitemapPath,
            options: {
                filename: '../sitemap.xml'
            }
        })

    ],
  
});