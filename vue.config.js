module.exports = {
    publicPath: "./", // 构建好的文件输出到哪里
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                "win": {
                    "target": "nsis",
                    "icon": "./icon1.ico"
                }
            }
        },
    },
}