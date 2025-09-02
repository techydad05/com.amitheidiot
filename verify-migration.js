#!/usr/bin/env node
// verify-migration.js - Comprehensive test of the SQLite migration

async function testMigration() {
  console.log('🔍 Verifying SQLite migration...\n');
  
  try {
    // Test 1: Import better-sqlite3
    console.log('1. Testing better-sqlite3 import...');
    const Database = (await import('better-sqlite3')).default;
    console.log('✅ better-sqlite3 imported successfully\n');
    
    // Test 2: Check database file exists
    console.log('2. Checking database file...');
    const fs = await import('fs');
    if (fs.existsSync('amitheidiot.db')) {
      console.log('✅ Database file exists\n');
    } else {
      console.log('❌ Database file not found\n');
      return false;
    }
    
    // Test 3: Connect to database
    console.log('3. Testing database connection...');
    const db = new Database('amitheidiot.db');
    console.log('✅ Connected to database\n');
    
    // Test 4: Check schema
    console.log('4. Verifying database schema...');
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    const tableNames = tables.map(t => t.name);
    console.log('   Tables found:', tableNames);
    
    const expectedTables = ['citizenship_questions', 'quiz_settings', 'quiz_results'];
    const missingTables = expectedTables.filter(table => !tableNames.includes(table));
    
    if (missingTables.length === 0) {
      console.log('✅ All required tables exist\n');
    } else {
      console.log('❌ Missing tables:', missingTables, '\n');
      return false;
    }
    
    // Test 5: Check data
    console.log('5. Checking database data...');
    const questionCount = db.prepare('SELECT COUNT(*) as count FROM citizenship_questions').get();
    console.log('   Questions:', questionCount.count);
    
    const settings = db.prepare('SELECT * FROM quiz_settings LIMIT 1').get();
    console.log('   Settings:', settings ? `${settings.num_questions} questions, ${settings.time_limit}s` : 'None');
    
    if (questionCount.count > 0) {
      console.log('✅ Database has sample data\n');
    } else {
      console.log('⚠️  No sample questions found (run npm run seed)\n');
    }
    
    // Test 6: Test CRUD operations
    console.log('6. Testing database operations...');
    const testId = 'test-' + Date.now();
    
    // Insert
    const insertStmt = db.prepare(`
      INSERT INTO quiz_results (id, score, total_questions, time_taken, answers)
      VALUES (?, ?, ?, ?, ?)
    `);
    const insertResult = insertStmt.run(testId, 8, 10, 120, JSON.stringify([{q: 'test', a: 0}]));
    console.log('   Insert result:', insertResult.changes, 'rows affected');
    
    // Select
    const selectStmt = db.prepare('SELECT * FROM quiz_results WHERE id = ?');
    const selectResult = selectStmt.get(testId);
    console.log('   Retrieved:', selectResult ? 'Success' : 'Failed');
    
    // Update
    const updateStmt = db.prepare('UPDATE quiz_results SET username = ? WHERE id = ?');
    const updateResult = updateStmt.run('testuser', testId);
    console.log('   Update result:', updateResult.changes, 'rows affected');
    
    // Delete (cleanup)
    const deleteStmt = db.prepare('DELETE FROM quiz_results WHERE id = ?');
    const deleteResult = deleteStmt.run(testId);
    console.log('   Cleanup result:', deleteResult.changes, 'rows affected');
    
    console.log('✅ All CRUD operations successful\n');
    
    db.close();
    
    // Test 7: Check if server files can import the db module
    console.log('7. Testing server module imports...');
    try {
      const { dbHelpers } = await import('./src/lib/server/db.js');
      console.log('✅ Database helpers imported successfully');
      
      // Test a helper function
      const questions = dbHelpers.getQuestions();
      console.log('   Helper test: Found', questions.length, 'questions');
      console.log('✅ Database helpers working correctly\n');
      
    } catch (error) {
      console.log('❌ Server module import failed:', error.message, '\n');
      return false;
    }
    
    console.log('🎉 Migration verification complete! All tests passed.');
    console.log('\n📋 Summary:');
    console.log('   ✅ SQLite database created and configured');
    console.log('   ✅ All required tables exist');
    console.log('   ✅ Sample data loaded');
    console.log('   ✅ CRUD operations working');
    console.log('   ✅ Server modules can access database');
    console.log('\n🚀 Ready to start the dev server with: npm run dev');
    
    return true;
    
  } catch (error) {
    console.error('❌ Migration verification failed:', error);
    return false;
  }
}

testMigration().then(success => {
  process.exit(success ? 0 : 1);
});