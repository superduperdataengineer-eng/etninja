const fs = require('fs');
const path = require('path');

function extractNumber(name) {
  const match = name.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function readImageFolders(baseDir, webBase) {
  const result = [];
  if (!fs.existsSync(baseDir)) return result;

  const folders = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(f => f.isDirectory())
    .sort((a, b) => extractNumber(a.name) - extractNumber(b.name));

  for (const folder of folders) {
    const folderPath = path.join(baseDir, folder.name);
    const files = fs.readdirSync(folderPath)
      .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
      .sort((a, b) => extractNumber(a) - extractNumber(b));

    if (files.length === 0) continue;

    result.push({
      title: folder.name,
      images: files.map(f => `${webBase}/${folder.name}/${f}`)
    });
  }
  return result;
}

function readCSV(filePath) {
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf-8');
}

const publicDir = path.join(__dirname, 'public');

const data = {
  linePics: readImageFolders(
    path.join(publicDir, 'ActionStoriesPics', 'LinePics'),
    '/ActionStoriesPics/LinePics'
  ),
  vocabPics: readImageFolders(
    path.join(publicDir, 'ActionStoriesPics', 'VocabPics'),
    '/ActionStoriesPics/VocabPics'
  ),
  linesCSV: readCSV(path.join(publicDir, 'actionCSV', 'LinesCSV.csv')),
  titlesCSV: readCSV(path.join(publicDir, 'actionCSV', 'TitlesCSV.csv')),
  vocabCSV: readCSV(path.join(publicDir, 'actionCSV', 'VocabularyCSV.csv'))
};

fs.writeFileSync(
  path.join(publicDir, 'segredosecret.json'),
  JSON.stringify(data, null, 2),
  'utf-8'
);

console.log('segredosecret.json generated successfully!');
