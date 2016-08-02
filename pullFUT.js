//TODO
// add serialization
// modularize
// 1. pull fut players
// 2. sync fut prices


var http = require('http');
var bl = require('bl');
var fs = require('fs');


var baseUrl =  'http://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject=';
var totalPages = 0;
var flatArray = [];
var params = { ovr: "75:99"};
var filename = 'playerData.json'

http.get(baseUrl + JSON.stringify(params), function(response)
{
	response.setEncoding("utf8");
	response.pipe(bl(getPageCountAndFetchData))
});

function getPageCountAndFetchData(err, data)
{
	totalPages = JSON.parse(data.toString()).totalPages;
	if (totalPages && totalPages > 0)
	{
		console.log(totalPages);
		fetchPagesAndSerialize(1);
	}
}

function fetchPagesAndSerialize(index)
{
	console.log(index);
	params.page = index;
	var currrentUrl = baseUrl + JSON.stringify(params);
	http.get(currrentUrl, function(response)
	{
		response.setEncoding("utf8");
		response.pipe(bl(function(err, data)
		{
			var currentData =JSON.parse(data.toString()); 
			var page = currentData.page;
			flatArray = flatArray.concat(currentData.items);

			if (page == totalPages)
			{
				serializeData();
			}

			else 
			{
				fetchPagesAndSerialize(index +1);
			}
		}))
	});

}

function serializeData()
{
	fs.writeFile(filename, JSON.stringify(flatArray, null, 4), function(err) 
	{
		if (err)
		{
			console.log(err);
		}
		else
		{
			console.log("\n" + totalPages + " pages of players written to " + filename);
		}
	}); 	
	// Or commit to DB of your choice
}