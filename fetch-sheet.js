const fs = require('fs');
const https = require('https');

// Ссылка на опубликованную таблицу
https://docs.google.com/spreadsheets/d/e/2PACX-1vSQLQurMonNkmv7EmFU5t7EfKF6XfvKL7DFdlyf4t1f-l3jEh9QF3bEZoIUpzYHC8qNfrW-Hbfb91Hw/pub?output=csv;

https.get(SHEET_URL, (response) => {
  let data = '';
  response.on('data', (chunk) => data += chunk);
  response.on('end', () => {
    // Сохраняем как CSV
    fs.writeFileSync('employees.csv', data);
    console.log('✅ Таблица обновлена!');
  });
});
