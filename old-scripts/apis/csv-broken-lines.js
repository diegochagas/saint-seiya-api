const fs = require('fs');

const csvData = require('./csv-data');

const stringToArray = csv => {
    console.log('csv imported:');
    console.log(csv);
	const newArray = csv.split(' | ').join(',').split('\\r\\n').join(',').split(' /  ').join(',').split('/').join(',').split(',');
	const arrayMap = newArray.map(arr => arr.replace('\n', ','));
	return arrayMap.join(',').split(',').join('\n');
}

fs.writeFile('csv-broken-lines.csv', stringToArray(csvData), err => {
	if(err) {
		return console.error(err);
	}
	console.log('The file was saved!');
});
