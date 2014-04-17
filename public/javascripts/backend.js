//var sampletext = require('./sampletext.js');


var emojidict = require('./emojidictfile.js');
var acctKey = "Swr9A1kb4Rua9Z5FFfw1qvK3dogaGPvkUtR1ceKv3kU";
var auth    = new Buffer([ acctKey, acctKey ].join(':')).toString('base64');
var request = require('request').defaults({
  headers : {
    'Authorization' : 'Basic ' + auth
  }
});



function parse_input(emoji_string){	
	var emoji_array = [];
	for (var i = 0; i<emoji_string.length; i+=2){
		emoji_array.push(emoji_string.slice(i,i+2));

	}
	var word_array = [];
		var new_word;
	for(var i =0; i<emoji_array.length; i++){
		new_word = emojidict.emojidict[emoji_array[i]];
		if(new_word!== undefined){
			if(new_word.indexOf(' ')!= -1){
				new_word = new_word.split(' ');
				console.log("new word split = ", new_word);
				for(var j=0; j<new_word.length; j++){
					word_array.push(new_word[j]);
				}
			}
			else{

			word_array.push(new_word);
			}
		}// end for loop
	}
	//var word_string = '';
	//for(var i = 0; i< word_array.length; i++){
	//	word_string = word_string.concat(word_array[i]);
	//	word_string = word_string.concat(' ');
	//}
	return word_array;

}





function get_info(emoji, cbf){
	var resultstext;
		var word_array = parse_input(emoji);
		console.log("WORD ARRAY IS ***, ", word_array);
var rootUri = 'https://api.datamarket.azure.com/Bing/Search';
var service_op = "Web";

var querystring = "'";
for(var i = 0; i<word_array.length; i++){
	querystring= querystring.concat(word_array[i]);
	querystring= querystring.concat("'");
}
console.log("querystring is: ", querystring);
// request.get({
// 	url: rootUri + '/' + service_op,
// 	qs:{
// 		$format : 'json',
// 		Query: querystring,
// 	}

// }, function(err, response, body){
// console.log(response.statusCode);
// 	if(response.statusCode == 200){

// 		var results = JSON.parse(response.body);
// 		var resultstext = results.d.results;
// 		if(resultstext.length>0){
// 			for(var j = 0; j<resultstext.length; j++){
		
// 	}
// 	}// there's stuff in word array
	
// 	}
	

// cbf(resultstext[0]["Url"]);
// });// end request
cbf('http://www.hospitallink.com/');


};



module.exports.get_info = get_info;


