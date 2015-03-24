(function (window, angular) {
  'use strict';
  /* global jQuery:true */

  angular.element(document).ready(function () {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    //Then init the app
    angular.bootstrap(document, ['mean'], {strictDi: true});

  });

  function processModules(modules) {
    var packageModules = ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router'], m, mn;
    for (var index in modules) {
      m = modules[index];
      mn = 'mean.' + m.name;
      angular.module(mn, m.angularDependencies || []);
      //console.log('loading module: ' + mn, m.angularDependencies, m);
      packageModules.push(mn);
    }

    angular.module('mean', packageModules);
  }

  jQuery.ajax('/_getModules', {
    dataType: 'json',
    async: false,
    success: processModules,
    error: function (jqXHR, msg, err) {
      console.error(msg, err, err.stack, jqXHR);
    }

  });

})(window, window.angular);
