const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Database connection (uses same config as main app)
const pool = new Pool(
    process.env.DATABASE_URL ? {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
    } : {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'sahibinden_cars',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'your_password',
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    }
);

async function importDatabase() {
    try {
        console.log('🗄️  Starting database import...');
        
        // Read SQL file
        const sqlPath = path.join(__dirname, '..', 'backup.sql');
        console.log('📁 Reading SQL file:', sqlPath);
        
        if (!fs.existsSync(sqlPath)) {
            throw new Error('backup.sql file not found!');
        }
        
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');
        console.log('📊 SQL file size:', (sqlContent.length / 1024 / 1024).toFixed(2), 'MB');
        
        // Execute SQL
        console.log('⚡ Executing SQL...');
        await pool.query(sqlContent);
        
        // Verify import
        const result = await pool.query('SELECT COUNT(*) FROM cars');
        console.log('✅ Import successful! Total cars:', result.rows[0].count);
        
        // Show sample data
        const sample = await pool.query('SELECT marka, seri, model, price FROM cars LIMIT 5');
        console.log('🚗 Sample data:');
        sample.rows.forEach(car => {
            console.log(`   ${car.marka} ${car.seri} ${car.model} - ${car.price}₺`);
        });
        
    } catch (error) {
        console.error('❌ Import failed:', error.message);
        throw error;
    } finally {
        await pool.end();
    }
}

// Run import if called directly
if (require.main === module) {
    importDatabase()
        .then(() => {
            console.log('🎉 Database import completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Import script failed:', error);
            process.exit(1);
        });
}

module.exports = { importDatabase };