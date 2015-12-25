// This is a very common exploit that used to exist in express itself
// when sending __proto__ as a key to a cache the server would crash.

var e = require("express");
var DVNA = e();
var numberCache = {}; // note this is not a Map
DVNA.get('/', function(req, res) {
	setTimeout(function(){ // simulate async action
		if(req.query.id in numberCache) { // "sanitize", but fails for __proto__
			res.send(numberCache[req.query.id].toFixed(2));
		} else {
			res.send("Not in cache");
		}
		res.end();
	});
});
DVNA.get("/add", function(req, res) { //GET only to simplify the example. 
	// the cache is typed, so we can expect all properties in it to
	// have a `toFixed` method.
	numberCache[req.query.key] = Number(req.query.value); 
})
DVNA.listen(1338);