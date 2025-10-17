// karma.conf.js

// Importamos nuestra propia configuración de Webpack, simple y limpia.
const webpackConfig = require('./webpack.karma.config');

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      // Le decimos a Karma que cargue el archivo de pruebas.
      'src/tests/**/*.spec.js'
    ],
    // Le decimos a Karma que use Webpack y Sourcemaps para procesar los archivos.
    preprocessors: {
      'src/tests/**/*.spec.js': ['webpack', 'sourcemap']
    },
    // Usamos nuestra configuración de Webpack personalizada.
    webpack: webpackConfig,
    
    // El resto de la configuración permanece igual.
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    browserNoActivityTimeout: 120000,
    client: {
      captureTimeout: 120000
    }
  });
};