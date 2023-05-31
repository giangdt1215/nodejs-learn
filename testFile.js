const fs = require('fs');

const content = 'Hello, Giang!';

fs.appendFile('file.log', content, err => {
	  if (err) {
		console.error(err);
	  }
	  // done!
});

const folderPath = '/';

fs.readdirSync(folderPath).map(fileName => {
	  console.log(fileName);
	});