const fs = require('fs');
const csv = require('csv-parser');

const municipalities = [];

// Load the CSV file containing the mapping of UF to SIGLA and NOME
const ufMapping = {};
fs.createReadStream('estados.csv', {encoding: 'utf8'}) // Specify encoding as utf8
    .pipe(csv({separator: ','}))
    .on('data', (row) =>
    {
        ufMapping[row['SIGLA'].trim()] = row['NOME'];
    })
    .on('end', () =>
    {
        console.log('UF mapping CSV file successfully processed');

        // Read the main CSV file containing municipalities
        fs.createReadStream('municipios.csv', {encoding: 'utf8'}) // Specify encoding as utf8
            .pipe(csv({separator: ';'}))
            .on('data', (row) =>
            {
                const estadoNome = ufMapping[row['UF']];
                const municipio = row['MUNICIPIO - TOM'];
                municipalities.push({
                    municipio: municipio.toLowerCase().replace(/(?:^|\s|-)\S/g, function (a)
                    {
                        return a.toUpperCase();
                    })
                    , uf: row['UF'], estado: estadoNome
                });
            })
            .on('end', () =>
            {
                console.log('Main CSV file successfully processed');

                // Write the modified data back to the CSV file
                const outputStream = fs.createWriteStream('municipios_with_estado.csv', {encoding: 'utf8'}); // Specify encoding as utf8
                outputStream.write('city,state\n');
                municipalities.forEach((municipio) =>
                {
                    outputStream.write(`${municipio.municipio} - ${municipio.uf},${municipio.estado}\n`);
                });
                outputStream.end();
                console.log('Modified CSV file saved successfully');
            })
            .on('error', (error) =>
            {
                console.error('Error processing main CSV file:', error.message);
            });
    })
    .on('error', (error) =>
    {
        console.error('Error processing UF mapping CSV file:', error.message);
    });