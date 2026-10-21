import dotenv from 'dotenv';
dotenv.config();


import app from './app.js';
import { pool, initializeTables } from './config/database.js';

const PORT = process.env.PORT || 5001;

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection verified');

    // Only initialize tables if INIT_DB environment variable is set
    if (process.env.INIT_DB === 'true') {
      console.log('🔄 Initializing database tables...');
      await initializeTables();
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════╗
║                                            ║
║   🚀 Server running on port ${PORT}        ║
║                                            ║
║   📍 API: http://localhost:${PORT}         ║
║   📚 Docs: http://localhost:${PORT}/       ║
║                                            ║
║   Environment: ${process.env.NODE_ENV || 'development'}                 ║
║                                            ║
╚════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
