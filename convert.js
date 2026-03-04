const fs = require('fs');

try {
    // Проверяем, существует ли файл
    if (!fs.existsSync('employees.csv')) {
        console.error('❌ Файл employees.csv не найден!');
        process.exit(1);
    }

    // Читаем CSV-файл
    const csvContent = fs.readFileSync('employees.csv', 'utf8');
    console.log('✅ CSV файл прочитан, длина:', csvContent.length);
    
    const lines = csvContent.trim().split('\n');
    console.log('📊 Найдено строк:', lines.length);

    // Проверяем, что есть заголовки
    if (lines.length < 2) {
        console.error('❌ В CSV нет данных (только заголовки или пусто)');
        process.exit(1);
    }

    // Первая строка - заголовки
    const headers = lines[0].split(',');
    console.log('📋 Заголовки:', headers);

    // Преобразуем строки в массив объектов
    const employees = [];

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue; // пропускаем пустые строки
        
        const values = lines[i].split(',');
        if (values.length >= 2) {
            employees.push({
                name: values[0].trim(),
                email: values[1].trim()
            });
        }
    }

    console.log(`👥 Обработано сотрудников: ${employees.length}`);

    // Читаем текущий index.html
    if (!fs.existsSync('index.html')) {
        console.error('❌ Файл index.html не найден!');
        process.exit(1);
    }

    let htmlContent = fs.readFileSync('index.html', 'utf8');
    console.log('✅ index.html прочитан');

    // Создаем новый массив для вставки
    const arrayString = JSON.stringify(employees, null, 2)
        .replace(/"([^"]+)":/g, '$1:'); // Убираем кавычки у ключей

    const newArrayContent = `const employees = ${arrayString};`;

    // Проверяем, есть ли в HTML место для замены
    if (!htmlContent.includes('const employees = [')) {
        console.error('❌ В index.html не найден массив employees для замены!');
        console.log('Убедитесь, что в index.html есть строка: const employees = [];');
        process.exit(1);
    }

    // Заменяем старый массив на новый
    const updatedHtml = htmlContent.replace(
        /const employees = \[[\s\S]*?\];/,
        newArrayContent
    );

    // Сохраняем обновленный HTML
    fs.writeFileSync('index.html', updatedHtml, 'utf8');
    
    console.log('✅ index.html успешно обновлен!');
    console.log('📊 Файл сохранен, размер:', updatedHtml.length);
    
    process.exit(0); // Успешное завершение

} catch (error) {
    console.error('❌ КРИТИЧЕСКАЯ ОШИБКА:', error.message);
    process.exit(1);
}
