export const ACCESS_CODE = "04112025";
export const QUESTIONS_PER_LEVEL = 15;
export const PASS_THRESHOLD_PERCENT = 80;
export const PASS_THRESHOLD_COUNT = Math.ceil((QUESTIONS_PER_LEVEL * PASS_THRESHOLD_PERCENT) / 100);

export const WRITING_PROMPTS = {
    'A1-A2': 'Write a short paragraph about your family (at least 5 sentences).',
    'B1-B2': 'Describe a memorable trip you have taken. What made it special? (at least 100 words).',
    'C1-C2': 'Discuss the impact of technology on modern society. Provide arguments for both positive and negative effects (at least 150 words).',
};

export const SPEAKING_PROMPTS = {
    'A1-A2': 'Please introduce yourself. Talk about your hobbies and your daily routine.',
    'B1-B2': 'Talk about your career goals. What do you want to achieve in the next 5 years?',
    'C1-C2': 'Explain a complex topic you are passionate about as if you were teaching it to someone for the first time.',
};
