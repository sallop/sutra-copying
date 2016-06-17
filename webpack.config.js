var webpack = require('webpack');

module.exports = {
  entry: {
    app: "./src/app.js",
    vendor: ["react", "react-dom"]
  },
  output: {
    path: "./dist",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { text: /\.jsx?$/, loader: "babel" }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    inline: true,
    contentBase: 'dist'
  }
};
