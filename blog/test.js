(function() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://testdb-ad2a.restdb.io/rest/people",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": "2f13cedf65990c38e3c3efc5be5377fac3bd7",
          "cache-control": "no-cache"
        }
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
})();