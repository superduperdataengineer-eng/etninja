const fs = require('fs');
const path = require('path');

const csvFolder = path.join(__dirname, 'public/actionCSV');
console.log('Looking for CSVs in:', csvFolder);

// Helper: convert CSV text to JSON array
function csvToJson(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim() !== '');
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = values[i] || '';
    });
    return obj;
  });
}

fs.readdir(csvFolder, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');

  if (csvFiles.length === 0) {
    console.log('No CSV files found.');
    return;
  }

  csvFiles.forEach(file => {
    const filePath = path.join(csvFolder, file);

    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        console.error('Error reading file:', file, err);
        return;
      }

      const jsonData = csvToJson(content);

      // Create JSON file in the same folder as CSV
      const jsonFileName = path.basename(file, '.csv') + '.json';
      const jsonFilePath = path.join(csvFolder, jsonFileName);

      // IMPORTANT: write UTF-8 and prevent escaping non-ASCII
      fs.writeFile(
        jsonFilePath,
        JSON.stringify(jsonData, null, 2), // stringify normally
        { encoding: 'utf8' }, // <- ensures proper encoding
        (err) => {
          if (err) {
            console.error('Error writing JSON file:', jsonFileName, err);
            return;
          }
          console.log(`Created JSON file: ${jsonFileName}`);
        }
      );
    });
  });
});
