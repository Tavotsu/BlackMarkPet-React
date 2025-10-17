// webpack.karma.config.js

module.exports = {
  // Usamos el modo development para evitar optimizaciones que puedan interferir.
  mode: 'development',
  // Generamos sourcemaps para que los errores en las pruebas sean fáciles de depurar.
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        // Para todos los archivos .js o .jsx...
        test: /\.(js|jsx)$/,
        // No incluyas la carpeta node_modules...
        exclude: /node_modules/,
        // ...usa babel-loader para transpilar el código.
        use: {
          loader: 'babel-loader',
          options: {
            // Usamos los presets estándar para React y JavaScript moderno.
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      // Agregamos una regla para manejar los archivos de imágenes.
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/inline'
      }
    ]
  },
  resolve: {
    // Permite que Webpack resuelva importaciones sin necesidad de poner la extensión.
    extensions: ['.js', '.jsx'],
  },
};