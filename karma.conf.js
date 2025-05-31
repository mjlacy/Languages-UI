// Karma configuration
// Generated on Fri May 30 2025 21:08:58 GMT-0500 (Central Daylight Time)

module.exports = function(config) {
  config.set({
    angularCli: {
      environment: 'dev',
      codeCoverage: true
    },
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",
    browserNoActivityTimeout: 200000,
    browserDisconnectTimeout: 200000,
    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['Chrome'],
    client: {
      clearContext: false,
      jasmine: {
        random: true
      }
    },
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity,
    coverageReporter: {
      reporters: [
        {
          type: "html",
          dir: "coverage/",
          subdir: ".",
          check: {
            emitWarning: true,
            global: {
              statements: 100,
              branches: 100,
              functions: 100,
              lines: 100
            }
          },
          watermarks: {
            statements: [50, 80],
            branches: [50, 80],
            functions: [50, 80],
            lines: [50, 80]
          },
          includeAllSources: true
        },
        {
          type: "text-summary"
        }
      ]
    },
    customLaunchers: {
      ChromeHeadless: {
        base: "Chrome",
        flags: ["--headless", "--disable-gpu", "--remote-debugging-port=9222"]
      }
    },
    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: [ "@angular-devkit/build-angular", "jasmine"],
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    mochaReporter: {
      output: "noFailures",
      showDiff: true,
      ignoreSkipped: true
    },
    plugins: [
      require("@angular-devkit/build-angular/plugins/karma"),
      require("karma-chrome-launcher"),
      require("karma-coverage"),
      require("karma-jasmine"),
      require("karma-jasmine-html-reporter"),
      require("karma-mocha-reporter")
    ],
    // web server port
    port: 9876,
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['coverage'] // Instrument all .js files in the src directory
    },
    // test results reporter to use
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ["mocha", "kjhtml", "coverage", "progress"],
    reportSlowerThan: 1000,
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
}
