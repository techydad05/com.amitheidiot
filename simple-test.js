// Simple test to check if better-sqlite3 is working
try {
  console.log('Testing better-sqlite3 import...');
  const Database = await import('better-sqlite3');
  console.log('✅ better-sqlite3 imported successfully');

  const db = new Database.default(':memory:');
  console.log('✅ In-memory database created');

  db.exec('CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)');
  console.log('✅ Table created');

  db.prepare('INSERT INTO test (name) VALUES (?)').run('test');
  console.log('✅ Data inserted');

  const result = db.prepare('SELECT * FROM test').get();
  console.log('✅ Data retrieved:', result);

  db.close();
  console.log('🎉 All tests passed!');
} catch (error) {
  console.error('❌ Test failed:', error);
}
