// FIX: Import the 'Level' type to resolve the "Cannot find name 'Level'" error.
import { Question, Level } from '../types';

export const questionBank: Question[] = [
  // A1-A2 Level
  { questionId: 'a1_01', level: 'A1-A2', topic: 'Basics', type: 'mcq', questionText: 'My name ___ John.', options: ['is', 'are', 'am', 'be'], correctAnswer: 'is' },
  { questionId: 'a1_02', level: 'A1-A2', topic: 'Basics', type: 'mcq', questionText: 'I ___ from Canada.', options: ['is', 'are', 'am', 'be'], correctAnswer: 'am' },
  { questionId: 'a1_03', level: 'A1-A2', topic: 'Family', type: 'mcq', questionText: 'She ___ my sister.', options: ['is', 'are', 'am', 'be'], correctAnswer: 'is' },
  { questionId: 'a1_04', level: 'A1-A2', topic: 'Food', type: 'mcq', questionText: '___ you like pizza?', options: ['Do', 'Does', 'Are', 'Is'], correctAnswer: 'Do' },
  { questionId: 'a1_05', level: 'A1-A2', topic: 'Home', type: 'mcq', questionText: 'There ___ a book on the table.', options: ['is', 'are', 'am', 'be'], correctAnswer: 'is' },
  { questionId: 'a1_06', level: 'A1-A2', topic: 'Shopping', type: 'mcq', questionText: 'How ___ is this shirt?', options: ['many', 'much', 'old', 'long'], correctAnswer: 'much' },
  { questionId: 'a1_07', level: 'A1-A2', topic: 'Transport', type: 'mcq', questionText: 'I go to work ___ bus.', options: ['on', 'in', 'by', 'at'], correctAnswer: 'by' },
  { questionId: 'a1_08', level: 'A1-A2', topic: 'Health', type: 'mcq', questionText: 'My head hurts. I have a ___.', options: ['headache', 'stomachache', 'toothache', 'fever'], correctAnswer: 'headache' },
  { questionId: 'a1_09', level: 'A1-A2', topic: 'Daily Routine', type: 'mcq', questionText: 'He ___ up at 7 AM every day.', options: ['wake', 'wakes', 'woke', 'waking'], correctAnswer: 'wakes' },
  { questionId: 'a1_10', level: 'A1-A2', topic: 'Time', type: 'mcq', questionText: 'What time ___ it?', options: ['is', 'are', 'do', 'does'], correctAnswer: 'is' },
  { questionId: 'a1_11', level: 'A1-A2', topic: 'Possession', type: 'mcq', questionText: 'That is ___ car. It belongs to them.', options: ['their', 'there', 'they\'re', 'theirs'], correctAnswer: 'their' },
  { questionId: 'a1_12', level: 'A1-A2', topic: 'Past Tense', type: 'mcq', questionText: 'Yesterday, I ___ to the cinema.', options: ['go', 'goes', 'went', 'gone'], correctAnswer: 'went' },
  { questionId: 'a1_13', level: 'A1-A2', topic: 'Plurals', type: 'mcq', questionText: 'There are many ___ in the park.', options: ['child', 'childs', 'children', 'childrens'], correctAnswer: 'children' },
  { questionId: 'a1_14', level: 'A1-A2', topic: 'Adjectives', type: 'mcq', questionText: 'This is an ___ book.', options: ['interesting', 'interested', 'interest', 'interests'], correctAnswer: 'interesting' },
  { questionId: 'a1_15', level: 'A1-A2', topic: 'Prepositions', type: 'mcq', questionText: 'The cat is ___ the table.', options: ['on', 'under', 'in', 'at'], correctAnswer: 'under' },
  
  // B1-B2 Level
  { questionId: 'b1_01', level: 'B1-B2', topic: 'Travel', type: 'mcq', questionText: 'I haven\'t seen him ___ last year.', options: ['for', 'since', 'ago', 'from'], correctAnswer: 'since' },
  { questionId: 'b1_02', level: 'B1-B2', topic: 'Work', type: 'mcq', questionText: 'If I ___ more time, I would learn another language.', options: ['have', 'had', 'will have', 'would have'], correctAnswer: 'had' },
  { questionId: 'b1_03', level: 'B1-B2', topic: 'Education', type: 'mcq', questionText: 'She has been a teacher ___ ten years.', options: ['for', 'since', 'during', 'while'], correctAnswer: 'for' },
  { questionId: 'b1_04', level: 'B1-B2', topic: 'Media', type: 'mcq', questionText: 'The film was ___ by a famous director.', options: ['directed', 'directing', 'direction', 'director'], correctAnswer: 'directed' },
  { questionId: 'b1_05', level: 'B1-B2', topic: 'Health', type: 'mcq', questionText: 'You should give ___ smoking. It\'s bad for your health.', options: ['up', 'in', 'off', 'away'], correctAnswer: 'up' },
  { questionId: 'b1_06', level: 'B1-B2', topic: 'Technology', type: 'mcq', questionText: 'This new app allows you ___ your photos easily.', options: ['to edit', 'edit', 'editing', 'for editing'], correctAnswer: 'to edit' },
  { questionId: 'b1_07', level: 'B1-B2', topic: 'Environment', type: 'mcq', questionText: 'We need to reduce our carbon ___.', options: ['footprint', 'handprint', 'fingerprint', 'mark'], correctAnswer: 'footprint' },
  { questionId: 'b1_08', level: 'B1-B2', topic: 'Conditionals', type: 'mcq', questionText: 'I would have come if I ___ you were there.', options: ['knew', 'had known', 'know', 'would know'], correctAnswer: 'had known' },
  { questionId: 'b1_09', level: 'B1-B2', topic: 'Relative Clauses', type: 'mcq', questionText: 'The man ___ wallet was stolen went to the police.', options: ['who', 'which', 'whose', 'whom'], correctAnswer: 'whose' },
  { questionId: 'b1_10', level: 'B1-B2', topic: 'Reported Speech', type: 'mcq', questionText: 'She told me she ___ tired.', options: ['is', 'was', 'has been', 'will be'], correctAnswer: 'was' },
  { questionId: 'b1_11', level: 'B1-B2', topic: 'Modals', type: 'mcq', questionText: 'You ___ have told me! I would have helped.', options: ['should', 'must', 'can', 'may'], correctAnswer: 'should' },
  { questionId: 'b1_12', level: 'B1-B2', topic: 'Phrasal Verbs', type: 'mcq', questionText: 'I can\'t ___ with this noise anymore.', options: ['put on', 'put up', 'put in', 'put off'], correctAnswer: 'put up' },
  { questionId: 'b1_13', level: 'B1-B2', topic: 'Idioms', type: 'mcq', questionText: 'It\'s raining cats and dogs, which means ___.', options: ['it\'s raining lightly', 'it\'s sunny', 'it\'s raining heavily', 'animals are falling'], correctAnswer: 'it\'s raining heavily' },
  { questionId: 'b1_14', level: 'B1-B2', topic: 'Gerunds & Infinitives', type: 'mcq', questionText: 'I enjoy ___ books in my free time.', options: ['read', 'to read', 'reading', 'to reading'], correctAnswer: 'reading' },
  { questionId: 'b1_15', level: 'B1-B2', topic: 'Vocabulary', type: 'mcq', questionText: 'He is a very ___ person; he always thinks of others.', options: ['considerate', 'considering', 'considerable', 'consider'], correctAnswer: 'considerate' },

  // C1-C2 Level
  { questionId: 'c1_01', level: 'C1-C2', topic: 'Academia', type: 'mcq', questionText: 'The study\'s findings were ___ and required further investigation.', options: ['inconclusive', 'inconcluding', 'unconcluded', 'nonclusive'], correctAnswer: 'inconclusive' },
  { questionId: 'c1_02', level: 'C1-C2', topic: 'Law', type: 'mcq', questionText: 'The defendant was ___ of all charges.', options: ['acquitted', 'accused', 'sentenced', 'convicted'], correctAnswer: 'acquitted' },
  { questionId: 'c1_03', level: 'C1-C2', topic: 'Economics', type: 'mcq', questionText: 'The government implemented ___ measures to curb inflation.', options: ['austerity', 'prosperity', 'liberty', 'frugality'], correctAnswer: 'austerity' },
  { questionId: 'c1_04', level: 'C1-C2', topic: 'Technology', type: 'mcq', questionText: 'The ubiquity of smartphones has fundamentally altered social ___.', options: ['interactions', 'abstractions', 'contractions', 'distractions'], correctAnswer: 'interactions' },
  { questionId: 'c1_05', level: 'C1-C2', topic: 'Politics', type: 'mcq', questionText: 'The politician\'s speech was mere ___, lacking any substantive policy proposals.', options: ['rhetoric', 'eloquence', 'discourse', 'prose'], correctAnswer: 'rhetoric' },
  { questionId: 'c1_06', level: 'C1-C2', topic: 'Medicine', type: 'mcq', questionText: 'A placebo is a substance with no therapeutic effect, used as a control in ___.', options: ['testing new drugs', 'diagnosing illness', 'performing surgery', 'physical therapy'], correctAnswer: 'testing new drugs' },
  { questionId: 'c1_07', level: 'C1-C2', topic: 'Abstract', type: 'mcq', questionText: 'Her argument, though eloquently stated, was built on a logical ___.', options: ['fallacy', 'veracity', 'acuity', 'felicity'], correctAnswer: 'fallacy' },
  { questionId: 'c1_08', level: 'C1-C2', topic: 'Advanced Grammar', type: 'mcq', questionText: '___ had I sat down than the phone rang.', options: ['No sooner', 'Scarcely', 'Hardly', 'Barely'], correctAnswer: 'No sooner' },
  { questionId: 'c1_09', level: 'C1-C2', topic: 'Vocabulary', type: 'mcq', questionText: 'The CEO\'s ___ decision to sell the company was met with criticism.', options: ['precipitate', 'ponderous', 'pragmatic', 'petulant'], correctAnswer: 'precipitate' },
  { questionId: 'c1_10', level: 'C1-C2', topic: 'Inversions', type: 'mcq', questionText: 'Not only ___ the exam, but he also got the highest score.', options: ['did he pass', 'he passed', 'he did pass', 'passed he'], correctAnswer: 'did he pass' },
  { questionId: 'c1_11', level: 'C1-C2', topic: 'Collocations', type: 'mcq', questionText: 'The team worked in ___ collaboration to finish the project on time.', options: ['close', 'tight', 'near', 'narrow'], correctAnswer: 'close' },
  { questionId: 'c1_12', level: 'C1-C2', topic: 'Nuance', type: 'mcq', questionText: 'To ___ is to secretly listen to a conversation.', options: ['eavesdrop', 'overhear', 'intercept', 'supervise'], correctAnswer: 'eavesdrop' },
  { questionId: 'c1_13', level: 'C1-C2', topic: 'Formal Language', type: 'mcq', questionText: 'The committee will ___ at 3 PM to discuss the proposal.', options: ['convene', 'gather', 'meet up', 'assemble'], correctAnswer: 'convene' },
  { questionId: 'c1_14', level: 'C1-C2', topic: 'Idioms', type: 'mcq', questionText: 'He decided to bite the ___ and confess to his mistake.', options: ['bullet', 'apple', 'dust', 'nail'], correctAnswer: 'bullet' },
  { questionId: 'c1_15', level: 'C1-C2', topic: 'Subjunctive', type: 'mcq', questionText: 'It is imperative that she ___ informed immediately.', options: ['be', 'is', 'was', 'were'], correctAnswer: 'be' },
];

// This function simulates fetching questions from an API.
export const fetchQuestionsForLevel = async (level: Level): Promise<Question[]> => {
  console.log(`Fetching questions for level: ${level}`);
  return new Promise(resolve => {
    setTimeout(() => {
      const questions = questionBank.filter(q => q.level === level);
      // In a real app, you would shuffle and select a subset.
      // Here we just return all for simplicity.
      resolve(questions);
    }, 500);
  });
};
