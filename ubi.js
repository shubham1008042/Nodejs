var ubidots = require('ubidots');
var client = ubidots.createClient('A1E-b0b04921f1e52bd25aefa2351c923bbc0ea2');
    
    client.auth(function () {
      this.getDatasources(function (err, data) {
         // console.log(data.results);
       });
    
      var ds = this.getDatasource('bcddc216218f');
    
      ds.getVariables(function (err, data) {
          // console.log(data.results);
      }); 
    
      ds.getDetails(function (err, details) {
          // console.log(details);
       });
    
      var v = this.getVariable('5cfe35cd5916363d69623e11');

      v.getDetails(function (err, details) {
        // console.log(details);
      });
    
        // v1.saveValue(22);
    
       v.getValues(function (err, data) {
          var hogg=data.results.slice(0)[0].value;
          console.log(hogg);
       });
    });


module.exports={ client }