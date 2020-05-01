const fs = require('fs');

fs.readFile(__dirname + '/../logs/log.txt', 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  console.log(data);
});
