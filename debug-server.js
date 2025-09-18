// debug-server.js - Minimal test to isolate the issue
console.log('🔍 Debug: Starting server test...');

try {
  console.log('1. Testing better-sqlite3 import...');
  const Database = await import('better-sqlite3');
  console.log('✅ better-sqlite3 imported');

  console.log('2. Testing database connection...');
  const db = new Database.default('amitheidiot.db');
  console.log('✅ Database connected');

  console.log('3. Testing simple query...');
  const result = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log(
    '✅ Query successful, tables:',
    result.map((r) => r.name)
  );

  console.log('4. Testing database module (fixed import)...');
  const { dbHelpers } = await import('./src/lib/server/db.js');
  console.log('✅ Database module imported');

  console.log('5. Testing database helpers...');
  const questions = dbHelpers.getQuestions();
  console.log('✅ Database helpers working, questions:', questions.length);

  db.close();
  console.log('🎉 All tests passed! The issue might be elsewhere.');
} catch (error) {
  console.error('❌ Error found:', error);
  console.error('Stack:', error.stack);
}
