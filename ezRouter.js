+function (window, undefined) {'use strict';
  window.ezRouter = function () {
    var that = this,
        intervalId,
        result;
    this.options = [];

    this.checkIfOptionsExists = function (options, callback) {
      result = options.length !== 0 ? true : false;
      callback(result);
    }

    function ajaxGet(url, callback) { // Fun fact: `get` in Swedish means `goat`.
      var request = new XMLHttpRequest(),
          response;
      request.open('GET', url, true);

      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          response = request.responseText;
        } else {
          response = request.responseText;
        }

        callback(response);
      };

      request.onerror = function () {
        response = request.responseText;
        callback(response);
      };

      request.send();
    }

    function route (hashFragment) {
      // Must wait for the options-array to be set
      // so we can load the right template.
      intervalId = window.setInterval(function () {
        that.checkIfOptionsExists(that.options, function (optionsDoesExist) {
         if (optionsDoesExist) {
          clearInterval(intervalId);
          render(hashFragment);
         }
        }); // checkIfOptionsExists
      }, 0);

      function render(hashFragment) {
        for (var i = 0; i < that.options.length; i++) {
          if (hashFragment === that.options[i].fragment) {
            ajaxGet(that.options[i].templateUrl, function (response) {
              that.renderToElement.innerHTML = response;

              if (that.options[i].functionToRun) {
                that.options[i].functionToRun();
              }
            });
            return;
          }

          // Running Router.otherwise()
          if (i === that.options.length - 1) {
            $.grep(that.options, function (object) {
              if (object.hasOwnProperty('redirectTo')) {
                location.href = object.redirectTo;

                ajaxGet(object.templateUrl, function (response) {
                  that.renderToElement.innerHTML = response;
                });
              }
            });
          }
        }
      }
    }

    if (!location.hash) {
      location.href = '#';
      route(location.hash.slice(1)); // Triggering Router.otherwise()
    } else {
      route(location.hash.slice(1)); // Triggering Router.when() to load template
    }

    // setTimeout() as a workaround to not trigger the hashchange-event
    // when user arrives at page with out `/#` in the url
    setTimeout(function () {
      window.addEventListener('hashchange', function (data) {
        route(location.hash.slice(1));
      });
    }, 0);
  }; // window.ezRouter

  ezRouter.prototype.renderTo = function (element) {
    if (typeof element === 'string' && element.length > 0) {
      if (element.substr(0, 1) === '#') {
        element = element.slice(1);
      }

      this.renderToElement = document.getElementById(element);
    } else {
      throw new Error('renderTo requiers parameter \'element\' to be a non-empty string');
    }

    return this;
  };

  ezRouter.prototype.when = function(config) {
    if (typeof config === 'object' && config.hasOwnProperty('templateUrl')) {
      this.options.push(config);
    }

    return this;
  };

  ezRouter.prototype.otherwise = function (config) {
    if (typeof config === 'object' && config.hasOwnProperty('templateUrl')) {
      if (!config.hasOwnProperty('redirectTo')) {
        config.redirectTo = '#';
      }

      this.options.push(config);
    }

    return this;
  };

}(window);