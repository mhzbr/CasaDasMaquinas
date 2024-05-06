const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('municipios_with_estado.csv')
    .pipe(csv())
    .on('data', (data) => {
        results.push(data);
    })
    .on('end', () => {
        // Write the JSON data to a file
        fs.writeFileSync('output.json', JSON.stringify(results, null, 2));
        console.log('CSV file successfully converted to JSON');
    })
    .on('error', (error) => {
        console.error('Error:', error.message);
    });