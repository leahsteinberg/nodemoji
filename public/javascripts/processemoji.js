//var natural = require('natural'), wordnet = new natural.WordNet("/Users/LeahSteinberg/hackerschool/emojiapp/node_modules/WNdb/dict/");
var natural = require('natural'), wordnet = new natural.WordNet(__dirname+"/../../node_modules/WNdb/dict/");


//var natural = require('natural'), wordnet = new natural.WordNet('');
//console.log(__dirname);
var TfIdf = natural.TfIdf, tfidf = new TfIdf();
var NGrams = natural.NGrams;

var emoji_dictfile = require('./emojidictfile.js');
var emoji_arrayfile = require('./emojiarrayfile.js');
var async = require('async');



fs = require('fs');

console.log("length emoji array", emojiarray.length);

var bigram_dict = {};
var emoji_syn = {};

for (icon in emojidict){
 	if(emojidict.hasOwnProperty(icon)){
 		var little_array = emojidict[icon].split(' ');
 		//var little_array = thestring
		emoji_syn[icon] = little_array;
 	}
 }
 //console.log(emoji_syn);



//var everyword = '';
// var word_array = [];
// for (icon in emojidict){
// 	if(emojidict.hasOwnProperty(icon)){
// 		var word_list = emojidict[icon].split(' ');
// 		for(var i =0; i<word_list.length; i++){
// 		word_array.push(word_list[i]);
// 		}
// 	}
// }
// console.log(word_array);

var synonyms_count = 0;
var get_synonym  = function(word, emoji, callback){
	//console.log(word, emoji);
	wordnet.lookup(word, function(results){
		if(results.length>0 ){
			wordnet.getSynonyms(results[0], function(results){
				results.forEach(function(result){
					//console.log(result.lemma);
					
					emoji_syn[emoji].push(result.lemma);
					
				});
			});
		}
		synonyms_count++;
			if(synonyms_count === emojiarray.length){
				callback();
			}
		 });
};



var loop_dict = function(callback){
//var j = 0;
//console.log("%%%%", emojiarray.length);
for(icon in emojidict){
	//j++;
	if(emojidict.hasOwnProperty(icon)){
		var words = emojidict[icon].split();
		for(var i = 0; i<words.length; i++){
			get_synonym(words[i], icon, function(){
			console.log("******", synonyms_count);
			console.log(emoji_syn);
		});
 		}
	}
	}
};

loop_dict();

 //for(icon in emojidict){
 	//console.log("hhiiii");

 //}
//console.log("hi", emoji_syn);


// for (property in emojidict){
// 	//console.log("hi");
// 	if(emojidict.hasOwnProperty(property)){
// 		var word = emojidict[property];
// 		//for (var i  = 0; i< word.length; i++){
// 			console.log("dsjflksjflksd");
// 			wordnet.lookup("extra", function(results){
// 				console.log("throwing!");
// 				throw "woo!"
// 				wordnet.getSynonyms(results[0], function(results){
// 					results.forEach(function(result){
// 				//console.log('~~~~~~~~~~~~~~~~~~~~');
// 				//console.log(result);
// 				//console.log(result.synsetOffset);
// 				//console.log(result.pos);
// 				//console.log('&&&&');
// 				//console.log(result.lemma);
// 				//console.log(result.pos);
// 				//console.log('$$$$$$');
// 				//console.log(result.gloss);
// 			});	
// 			});
// 			});
// 		//}

		//console.log(emojidict[property]);

			
		
		//emoji_syn[property].push([emojidict[property], synonym, synonym]);

		//everyword+=emojidict[property] + ' ';
		//word_array.push(emojidict[property]);
	//}
//}



var gettfidf = function(dictionary){
	for(property in dictionary){
		if(dictionary.hasOwnProperty(property)){
			tfidf.addDocument(dictionary[property]);
		}
	}
	var tf_dict = {};
	for(var j = 0; j<emojiarray.length; j++){
		tfidf.listTerms(j).forEach(function(item){
			tf_dict[item.term] = item.tfidf;
			//console.log(item.term + ': ' + item.tfidf);
		});
	}
	return tf_dict;

};

var bigram_freq = function(text_string){
	var bigram_array = NGrams.bigrams(text_string);
		for(var i = 0; i< bigram_array.length; i++){
			if(word_array.indexOf(bigram_array[i][0])>-1 && word_array.indexOf(bigram_array[i][1]) >-1){
				name_of_bigram = bigram_array[i][0] + ', ' + bigram_array[i][1];
			if(bigram_dict[name_of_bigram] === undefined){
				bigram_dict[name_of_bigram] = 1;
			}
			else{
				bigram_dict[name_of_bigram] +=1;
			}
		}
	}
			console.log("####");
			console.log(bigram_dict);

};



var add_to_bigram = function(file_string){
	fs.readFile(file_string, function(err, data){
		//console.log(err);
		//console.log(typeof(data));
		bigram_freq(String(data));
	});
};


var make_bigrams = function(){
	async.each(texts_array, function(file, callback){
	fs.readFile(file, function(err, data){
			//console.log(err);
			//console.log(typeof(data));
			bigram_freq(String(data));
			callback();
		});
	}, function(err){
		if(err){
			console.log('file failed to process');

		}
		else{
			console.log("processed the file successfully!");
	        var bigramdictfile = './bigramdictfile.js';
	    fs.writeFile(bigramdictfile, JSON.stringify(bigram_dict, null, 3), function(err) {
	    if(err) {
	      console.log(err);
	    } else {
	      console.log("JSON saved to " + bigramdictfile);
	    }
});




	}

});
console.log("out of EACH thing");
console.log(bigram_dict);
};


//// start of script:

// var texts_array = [];
// fs.readFile('file_names.js', function(err, data){
// 	//console.log(data);
// 		var datastring = String(data);
// 		var lineArray = datastring.split('\n');
// 		for(var i =0; i< lineArray.length; i++){
// 			var each_file = lineArray[i].split('  ');
// 			for(var j = 0; j<each_file.length; j++){
// 				var appended = "./texts/"+each_file[j];
// 				if(appended.length < 20){
// 				texts_array.push(appended);

// 				}
// 			}
// 		}
// console.log(texts_array);
// make_bigrams();

// });







