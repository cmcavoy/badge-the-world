const config = require('../lib/config');
const Spreadsheet = require('google-spreadsheet-stream');

var pledgeSheet = new Spreadsheet(config('SPREADSHEET_KEY'));

exports.home = function home (req, res, next) {
  pledges = [];
  var rowsStream = pledgeSheet.getRows(config('SPREADSHEET_WORKSHEET_ID'))
    .on('data', function(data) {
      var newPledge = {
        timestamp: data[0],
        ways: data[1],
        ideas: data[2],
        numPeople: data[3],
        location: data[4]
      };
      pledges.push(newPledge);
    })
    .on('end', function() {
      res.render('core/home.html', { pledges: JSON.stringify(pledges) });
    });
}



exports.pledge = function home (req, res, next) {
  return res.render('core/pledge.html');
}