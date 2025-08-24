const pool = require('./db');

async function checkDatabaseStructure() {
    try {
        // Tablo yapısını kontrol et
        const tableQuery = `
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'cars'
            ORDER BY ordinal_position;
        `;
        
        const result = await pool.query(tableQuery);
        
        console.log('📊 Cars tablosu sütunları:');
        console.log('========================');
        result.rows.forEach(row => {
            console.log(`${row.column_name}: ${row.data_type}`);
        });
        
        // Örnek veri çek
        const sampleQuery = `SELECT * FROM cars LIMIT 1`;
        const sampleResult = await pool.query(sampleQuery);
        
        console.log('\n📝 Örnek veri:');
        console.log('========================');
        if (sampleResult.rows.length > 0) {
            console.log(JSON.stringify(sampleResult.rows[0], null, 2));
        } else {
            console.log('Tabloda veri yok');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('Hata:', error.message);
        process.exit(1);
    }
}

checkDatabaseStructure();