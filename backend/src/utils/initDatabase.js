import { initializeTables, pool } from '../config/database.js';

console.log('🔄 Starting database initialization...\n');

initializeTables()
  .then(() => {
    console.log('\n✅ Database initialization completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database initialization failed:', error);
    process.exit(1);
  })
  .finally(() => {
    pool.end();
  });
