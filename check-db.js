import Database from 'better-sqlite3';

const db = new Database('amitheidiot.db');
const count = db.prepare('SELECT COUNT(*) as count FROM citizenship_questions').get();
console.log(`Total questions in database: ${count.count}`);

const questions = db.prepare('SELECT id, question FROM citizenship_questions LIMIT 5').all();
console.log('\nFirst 5 questions:');
questions.forEach((q) => {
  console.log(`${q.id}: ${q.question.substring(0, 50)}...`);
});

db.close();
