(function (global) {
  System.config({
    paths: {
      'libs:': 'assets/libs/'
    },
    map: {
      'app': 'app',
      '@angular/core': 'libs:@angular/core/bundles/core.umd.js',
      '@angular/common': 'libs:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'libs:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'libs:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'libs:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'libs:@angular/http/bundles/http.umd.js',
      '@angular/router': 'libs:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'libs:@angular/forms/bundles/forms.umd.js',
      'rxjs': 'libs:rxjs',
      'jquery': 'libs:jquery',
      'ms-signalr-client':'libs:ms-signalr-client',
      'angular2-toaster': 'libs:angular2-toaster/bundles/angular2-toaster.umd.min.js'
    },
    packages: {
      'app': {
        'main': './main.plugin.js',
        'defaultExtension': 'js'
      },
      'rxjs': {
        'defaultExtension': 'js'
      },
      'jquery':{
        'main': 'dist/jquery.min.js',
        'defaultExtension': 'js'
      },
      'ms-signalr-client':{
        'main':'jquery.signaIR.js',
        'defaultExtension': 'js'
      },
      'angular2-toaster': {
        'defaultExtension': 'js'
      }
    }
  });
})(this);