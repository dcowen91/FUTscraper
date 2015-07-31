
var http = require('http');
var bl = require('bl');


var baseUrl =  'http://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject=';
var totalPages = 0;
var result = '';

http.get(baseUrl, function(response)
{
	response.setEncoding("utf8");
	response.on('data', concatData);
	response.on('error', console.error);
	response.on('end', handlePageCount);
});

function concatData(data)
{
	result += data.toString();
}

function handlePageCount()
{
	var jsonBlob = JSON.parse(result);
	result = '';
	totalPages = jsonBlob.totalPages;
	console.log(totalPages + "pages");
	getAllPages();
}

function getAllPages()
{
	//add promise so this is isnt broken
	for (var i = 1; i <= 1; i++)
	{
		var pages = {page : i};
		var curUrl = baseUrl + JSON.stringify(pages);
		http.get(curUrl, function(response)
		{
			response.setEncoding("utf8");
			response.on('data', concatData);
			response.on('error', console.error);
			response.on('end', concatJson);
		});
	}
}

function concatJson()
{
	var jsonblob = JSON.parse(result);
	result = '';
	console.log(jsonblob.items[0].rating + " rated " + jsonblob.items[0].name);
}