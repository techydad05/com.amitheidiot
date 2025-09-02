// test-db.js - Quick test of database functionality
import { dbHelpers } from './src/lib/server/db.js';

try {
  console.log('Testing database connection...');
  
  // Test getting questions
  const questions = dbHelpers.getQuestions();
  console.log(`✅ Found ${questions.length} questions in database`);
  
  // Test getting settings
  const settings = dbHelpers.getSettings();
  console.log('✅ Settings:', settings);
  
  // Test inserting a quiz result
  const testId = 'test-' + Date.now();
  dbHelpers.insertQuizResult(testId, 8, 10, 120, [
    { question: 'Test question', selectedAnswer: 0, correct: true }
  ]);
  console.log('✅ Successfully inserted test quiz result');
  
  // Test getting the quiz result
  const result = dbHelpers.getQuizResult(testId);
  console.log('✅ Retrieved quiz result:', { id: result.id, score: result.score });
  
  console.log('🎉 All database tests passed!');
  
} catch (error) {
  console.error('❌ Database test failed:', error);
  process.exit(1);
}