
var http = require('http');
var bl = require('bl');


var baseUrl =  'http://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject=';
var totalPages = 0;
var arr = [];

http.get(baseUrl + JSON.stringify({ ovr: "74:99"}), function(response)
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
	var params = {page : index, ovr: "74:99"};
	var currrentUrl = baseUrl + JSON.stringify(params);
	http.get(currrentUrl, function(response)
	{
		response.setEncoding("utf8");
		response.pipe(bl(function(err, data)
		{
			var currentData =JSON.parse(data.toString());
			arr.push(currentData.items);

			if (arr.length == totalPages - 1)
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
	for (var i = 0; i < arr.length; i++)
	{
		console.log(arr[i][0].rating + " rated " + arr[i][0].name);
		//Commit to DB of your choice
	}
}