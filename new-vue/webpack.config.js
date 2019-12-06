//css 加前缀 postcss
//文件拷贝 copy-webpack-plugin
//暴露打包过程 providePlugin expose-loader
const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');// 新的写法
const webpack = require('webpack');
// let ExtractTextWebpackPlugin =  require('extract-text-webpack-plugin');
//vue loader插件
// let VueLoaderPlugin = require('vue-loader/lib/plugin')
// const { VueLoaderPlugin } = require('vue-loader');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// console.log(VueLoaderPlugin)


//开发环境禁用 不抽取
// let CssExtract = new ExtractTextWebpackPlugin({
//     filename:'css/css.css'
// });
// let glob = require('glob');
// let PurifycssWebpack = require('purifycss-webpack');//必须用在HtmlWebpackPlugin后面
// let CopyWebpackPlugin = require('copy-webpack-plugin')
const webpackConfig = {
    entry:{
        main: ['babel-polyfill', './src/main.js']
    },//入口
    output:{
        filename:'build.[hash:8].js',//绝对路径
         //多出口
        // filename:'[name].[hash:8].js',
        path:path.resolve('./build')
    },//出口
    devServer:{
        contentBase:'./build',
        port:3000,
        compress:true,//服务器压缩
        open:true, //自动打开浏览器
        hot:true,//热更新
    },//开发服务器
    module:{
        rules:[//从右往左写
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.css$/,
                use: [
                  'css-loader'
                ],
              },
              {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                exclude: path.resolve(__dirname, 'node_modules')
            }
        ]
    },//模块配置
    plugins:[
        //
        // new ExtractTextWebpackPlugin({
        //     filename:'css/index.css'
        // }),
        // CssExtract,
        // new CopyWebpackPlugin([
        //     // {
        //     //     from:'./src/doc',
        //     //     to:'public'
        //     // }
        // ]),
        //webpack内置热更新插件
        new webpack.HotModuleReplacementPlugin(),
        //清空打包文件
        new CleanWebpackPlugin(),
        // 打包html插件
        new htmlWebpackPlugin({ // 创建一个在内存汇总生成html页面的插件
            template:path.resolve('./src/index.html'),//指定模板页面,
            filename:'index.html',//指定生成页面的名称
        }),
        new VueLoaderPlugin()
        //没用的css消除
        // new PurifycssWebpack({
        //     paths:glob.sync(path.resolve('src/*.html'))
        // })
       
    ],//插件的配置
    mode:'development',//可以更改模式
    resolve:{
       
    },//配置解析
}

module.exports = webpackConfig;
// 1. 在webpack中配置开发服务器 npm install webpack-dev-server -D 
// 2.webpack插件 将html打包到build目录下 npm install html-webpack-plugin -D
// 3.每次打包前清楚之前的文件 npm install clean-webpack-plugin -D

//css 预处理 ExtractTextWebpackPlugin
//1. 抽离样式 抽离到一个css文件 通过css文件的方式来引用
