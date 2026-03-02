const fs = require('fs');

// Читаем CSV-файл
const csvContent = fs.readFileSync('employees.csv', 'utf8');
const lines = csvContent.trim().split('\n');

// Первая строка - заголовки
const headers = lines[0].split(',');

// Преобразуем строки в массив объектов
const employees = [];

for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    
    // Обработка случая, когда в имени есть запятые
    let name = values[0];
    let email = values[1];
    
    // Если в строке больше двух частей (бывают запятые в имени)
    if (values.length > 2) {
        // Собираем имя обратно (оно могло содержать запятые)
        name = values.slice(0, values.length - 1).join(',');
        email = values[values.length - 1];
    }
    
    employees.push({
        name: name.trim(),
        email: email.trim()
    });
}

// Форматируем массив для вставки в HTML
const arrayString = JSON.stringify(employees, null, 2)
    .replace(/"([^"]+)":/g, '$1:'); // Убираем кавычки у ключей (для JavaScript-формата)

const newArrayContent = `const employees = ${arrayString};`;

// Читаем текущий index.html
let htmlContent = fs.readFileSync('index.html', 'utf8');

// Заменяем старый массив на новый
const updatedHtml = htmlContent.replace(
    /const employees = \[[\s\S]*?\];/,
    newArrayContent
);

// Сохраняем обновленный HTML
fs.writeFileSync('index.html', updatedHtml);

console.log('✅ index.html успешно обновлен!');
console.log(`📊 Обработано сотрудников: ${employees.length}`);
