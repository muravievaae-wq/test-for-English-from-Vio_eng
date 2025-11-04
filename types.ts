export type Level = 'A1-A2' | 'B1-B2' | 'C1-C2';
export type QuestionType = 'mcq' | 'writing' | 'speaking';

export interface Question {
  questionId: string;
  questionText: string;
  options?: string[];
  correctAnswer: string;
  level: Level;
  topic: string;
  type: 'mcq'; // For simplicity, supplementary tasks are handled separately
}

export interface Answer {
  questionId: string;
  questionText: string;
  options?: string[];
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  level: Level;
  topic: string;
}

export interface BlockResult {
  level: Level;
  questions: Answer[];
  score: number;
  total: number;
}

export interface SupplementaryTasks {
  writing?: {
    prompt: string;
    response: string;
    score?: number;
    comments?: string;
  };
  speaking?: {
    prompt: string;
    audioUrl?: string; // a blob URL
    score?: number;
    comments?: string;
  };
}

export interface Submission {
  submissionId: string;
  student: {
    name: string;
    age: number;
    goals: string;
    fears: string;
    format: string;
  };
  consent: boolean;
  blocks: BlockResult[];
  supplementaryTasks: SupplementaryTasks;
  preliminaryLevel: string;
  finalLevel?: string;
  status: 'awaiting_review' | 'checked';
  createdAt: string;
  teacherComments?: string;
}
