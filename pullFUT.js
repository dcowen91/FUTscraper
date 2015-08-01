
var http = require('http');
var bl = require('bl');


var baseUrl =  'http://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject=';
var totalPages = 0;
var arr = [];

http.get(baseUrl, function(response)
{
	response.setEncoding("utf8");
	response.pipe(bl(getPageCount))
});

function getPageCount(err, data)
{
	totalPages = JSON.parse(data.toString()).totalPages;
	console.log(totalPages);
	//716
	getPage(1);
}

function getPage(index)
{
	console.log(index);
	var pages = {page : index};
	var curUrl = baseUrl + JSON.stringify(pages);
	http.get(curUrl, function(response)
	{
		response.setEncoding("utf8");
		response.pipe(bl(function(err, data)
		{
			var current =JSON.parse(data.toString());
			arr.push(current.items);

			if (arr.length == totalPages - 1)
			{
				serializeData();
			}
			else 
			{
				getPage(index +1);
			}
		}))
	});

}

function serializeData()
{
	for (var i = 0; i < arr.length; i++)
	{
		console.log(arr[i][0].rating + " rated " + arr[i][0].name);
		//Commit to DB of your choice
	}
}