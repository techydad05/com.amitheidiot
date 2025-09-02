// test-migration.js - Test the SQLite migration
import Database from 'better-sqlite3';

console.log('🧪 Testing SQLite migration...');

try {
  // Test basic SQLite functionality
  console.log('1. Testing basic SQLite connection...');
  const testDb = new Database(':memory:');
  testDb.exec('CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)');
  testDb.prepare('INSERT INTO test (name) VALUES (?)').run('test');
  const result = testDb.prepare('SELECT * FROM test').get();
  console.log('✅ Basic SQLite test passed:', result);
  testDb.close();

  // Test the actual database file
  console.log('2. Testing actual database file...');
  const db = new Database('amitheidiot.db');
  
  // Check if tables exist
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log('✅ Database tables found:', tables.map(t => t.name));
  
  // Test questions table
  const questionCount = db.prepare('SELECT COUNT(*) as count FROM citizenship_questions').get();
  console.log('✅ Questions in database:', questionCount.count);
  
  // Test settings table
  const settings = db.prepare('SELECT * FROM quiz_settings LIMIT 1').get();
  console.log('✅ Quiz settings:', settings);
  
  // Test inserting a quiz result
  const testId = 'test-' + Date.now();
  const insertResult = db.prepare(`
    INSERT INTO quiz_results (id, score, total_questions, time_taken, answers)
    VALUES (?, ?, ?, ?, ?)
  `).run(testId, 8, 10, 120, JSON.stringify([{question: 'test', answer: 0}]));
  
  console.log('✅ Test quiz result inserted:', insertResult.changes);
  
  // Test retrieving the result
  const retrievedResult = db.prepare('SELECT * FROM quiz_results WHERE id = ?').get(testId);
  console.log('✅ Test quiz result retrieved:', {
    id: retrievedResult.id,
    score: retrievedResult.score,
    total_questions: retrievedResult.total_questions
  });
  
  db.close();
  
  console.log('🎉 All database tests passed! Migration successful!');
  
} catch (error) {
  console.error('❌ Database test failed:', error);
  process.exit(1);
}