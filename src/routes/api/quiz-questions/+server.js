import { json } from '@sveltejs/kit';
import { dbHelpers } from '$lib/server/db.js';

export async function GET({ url }) {
  try {
    const category = url.searchParams.get('category');
    const difficulty = url.searchParams.get('difficulty');
    const limit = parseInt(url.searchParams.get('limit') || '10');

    let questions;

    if (category && difficulty) {
      // Get questions by both category and difficulty
      const db = dbHelpers.getQuestions();
      questions = db.filter(q => q.category === category && q.difficulty === difficulty)
                   .sort(() => Math.random() - 0.5)
                   .slice(0, limit);
    } else if (category) {
      questions = dbHelpers.getQuestionsByCategory(category).slice(0, limit);
    } else if (difficulty) {
      questions = dbHelpers.getQuestionsByDifficulty(difficulty).slice(0, limit);
    } else {
      questions = dbHelpers.getRandomQuestions(limit);
    }

    // Transform questions to match the expected format
    const formattedQuestions = questions.map(q => {
      let options;
      try {
        // Try to parse options as JSON first
        options = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
      } catch (e) {
        // If parsing fails, assume it's individual columns
        options = [q.option_a, q.option_b, q.option_c, q.option_d];
      }

      // Handle correct answer - could be integer or letter
      let correct;
      if (typeof q.correct_answer === 'number') {
        correct = q.correct_answer;
      } else {
        correct = q.correct_answer === 'A' ? 0 : q.correct_answer === 'B' ? 1 : q.correct_answer === 'C' ? 2 : 3;
      }

      return {
        id: q.id,
        question: q.question,
        options: options,
        correct: correct,
        category: q.category || 'citizenship',
        difficulty: q.difficulty || 'easy'
      };
    });

    return json({
      success: true,
      questions: formattedQuestions,
      total: formattedQuestions.length
    });

  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    return json({
      success: false,
      error: 'Failed to fetch quiz questions'
    }, { status: 500 });
  }
}