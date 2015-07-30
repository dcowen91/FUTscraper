
var http = require('http');
var bl = require('bl')


var baseUrl =  'http://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject=%7B%22page%22:{0}%7D';
var totalPages = 0;
var result = '';

http.get(baseUrl, function(response)
{
	response.setEncoding("utf8");
	response.on('data', concatData);
	response.on('error', console.error);
	response.on('end', handleData)
})

function concatData(data)
{
	result += data.toString();
}

function handleData()
{
	var jsonBlob = JSON.parse(result)
	console.log(totalPages = jsonBlob.totalPages);
}
