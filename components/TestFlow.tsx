import React, { useState, useEffect, useRef } from 'react';
import { Level, Question, Submission, BlockResult, Answer, SupplementaryTasks } from '../types';
import { fetchQuestionsForLevel } from '../services/questionBank';
import { PASS_THRESHOLD_COUNT, QUESTIONS_PER_LEVEL, SPEAKING_PROMPTS, WRITING_PROMPTS } from '../constants';
import { MicrophoneIcon, PlayIcon, StopIcon } from './Icons';

interface TestFlowProps {
  onTestComplete: (submission: Submission) => void;
}

const LEVEL_ORDER: Level[] = ['A1-A2', 'B1-B2', 'C1-C2'];

export const TestFlow: React.FC<TestFlowProps> = ({ onTestComplete }) => {
  const [step, setStep] = useState<'info' | 'test' | 'supplementary' | 'complete'>('info');
  const [studentInfo, setStudentInfo] = useState({ name: '', age: '', goals: '', fears: '', format: 'online' });
  const [consent, setConsent] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [blockResults, setBlockResults] = useState<BlockResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [finalPreliminaryLevel, setFinalPreliminaryLevel] = useState('A1-A2');
  const [supplementaryTasks, setSupplementaryTasks] = useState<SupplementaryTasks>({});
  const [writingResponse, setWritingResponse] = useState('');
  
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const currentLevel = LEVEL_ORDER[currentLevelIndex];

  useEffect(() => {
    if (step === 'test' && questions.length === 0 && currentLevelIndex < LEVEL_ORDER.length) {
      loadQuestions(currentLevel);
    }
  }, [step, currentLevelIndex]);

  const loadQuestions = async (level: Level) => {
    setIsLoading(true);
    const fetchedQuestions = await fetchQuestionsForLevel(level);
    setQuestions(fetchedQuestions.slice(0, QUESTIONS_PER_LEVEL));
    setIsLoading(false);
    setCurrentQuestionIndex(0);
  };
  
  const handleStartTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (consent) {
      setStep('test');
    } else {
      alert('Вы должны согласиться на обработку персональных данных, чтобы начать тест.');
    }
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    const newAnswer: Answer = {
      questionId: currentQuestion.questionId,
      questionText: currentQuestion.questionText,
      options: currentQuestion.options,
      studentAnswer: selectedOption || '',
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      level: currentQuestion.level,
      topic: currentQuestion.topic
    };
    
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      // End of level block
      const score = updatedAnswers.filter(a => a.isCorrect).length;
      const newBlockResult: BlockResult = {
        level: currentLevel,
        questions: updatedAnswers,
        score,
        total: questions.length
      };
      
      const updatedBlockResults = [...blockResults, newBlockResult];
      setBlockResults(updatedBlockResults);

      if (score >= PASS_THRESHOLD_COUNT && currentLevelIndex < LEVEL_ORDER.length - 1) {
        // Passed, move to next level
        setCurrentLevelIndex(currentLevelIndex + 1);
        setAnswers([]); // Reset answers for next block
        setQuestions([]); // Will trigger useEffect to load new questions
      } else {
        // Failed or last level, go to supplementary/complete
        const preliminaryLevel = score < PASS_THRESHOLD_COUNT && currentLevelIndex > 0 ? LEVEL_ORDER[currentLevelIndex -1] : currentLevel;
        setFinalPreliminaryLevel(preliminaryLevel);
        
        const writingPrompt = WRITING_PROMPTS[preliminaryLevel as keyof typeof WRITING_PROMPTS];
        const speakingPrompt = SPEAKING_PROMPTS[preliminaryLevel as keyof typeof SPEAKING_PROMPTS];

        setSupplementaryTasks({
            writing: { prompt: writingPrompt, response: '' },
            speaking: { prompt: speakingPrompt }
        });

        setStep('supplementary');
      }
    }
  };

  const handleFinishTest = () => {
     const submission: Submission = {
      submissionId: `sub_${new Date().getTime()}`,
      student: {
        name: studentInfo.name,
        age: parseInt(studentInfo.age),
        goals: studentInfo.goals,
        fears: studentInfo.fears,
        format: studentInfo.format,
      },
      consent: consent,
      blocks: blockResults,
      supplementaryTasks: {
          writing: { ...supplementaryTasks.writing!, response: writingResponse },
          speaking: { ...supplementaryTasks.speaking!, audioUrl: audioUrl }
      },
      preliminaryLevel: finalPreliminaryLevel,
      status: 'awaiting_review',
      createdAt: new Date().toISOString(),
    };
    onTestComplete(submission);
    setStep('complete');
  };

  const startRecording = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];
        mediaRecorderRef.current.ondataavailable = event => {
            audioChunksRef.current.push(event.data);
        };
        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
    } catch (err) {
        console.error("Error accessing microphone:", err);
        alert("Microphone access is required for the speaking task. Please allow access and try again.");
    }
  };

  const stopRecording = () => {
      if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
      }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  
  if (step === 'info') {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-black">
        <h1 className="text-3xl font-bold mb-1 text-center text-dark-red">Welcome to the English Placement Test</h1>
        <p className="text-center text-gray-600 mb-6 italic">from Violetta 2025</p>
        <p className="text-center text-gray-600 mb-6">Пожалуйста, заполните эту форму, чтобы начать.</p>
        <form onSubmit={handleStartTest} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black">Полное имя</label>
            <input type="text" id="name" value={studentInfo.name} onChange={e => setStudentInfo({...studentInfo, name: e.target.value})} className="mt-1 block w-full px-3 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-gray-500 text-black focus:outline-none focus:border-dark-red focus:ring-1 focus:ring-dark-red" required />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-black">Возраст</label>
            <input type="number" id="age" value={studentInfo.age} onChange={e => setStudentInfo({...studentInfo, age: e.target.value})} className="mt-1 block w-full px-3 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-gray-500 text-black focus:outline-none focus:border-dark-red focus:ring-1 focus:ring-dark-red" required />
          </div>
           <div>
              <label htmlFor="goals" className="block text-sm font-medium text-black">Каковы ваши цели в изучении английского языка?</label>
              <textarea id="goals" rows={3} value={studentInfo.goals} onChange={e => setStudentInfo({...studentInfo, goals: e.target.value})} className="mt-1 block w-full px-3 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-gray-500 text-black focus:outline-none focus:border-dark-red focus:ring-1 focus:ring-dark-red" required />
          </div>
          <div>
              <label htmlFor="fears" className="block text-sm font-medium text-black">Каковы ваши самые большие страхи или трудности в изучении английского языка?</label>
              <textarea id="fears" rows={3} value={studentInfo.fears} onChange={e => setStudentInfo({...studentInfo, fears: e.target.value})} className="mt-1 block w-full px-3 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-gray-500 text-black focus:outline-none focus:border-dark-red focus:ring-1 focus:ring-dark-red" required />
          </div>
          <div>
              <label className="block text-sm font-medium text-black">Какой формат занятий вы предпочитаете?</label>
              <select value={studentInfo.format} onChange={e => setStudentInfo({...studentInfo, format: e.target.value})} className="mt-1 block w-full px-3 py-2 bg-white border border-black rounded-md text-sm shadow-sm text-black focus:outline-none focus:border-dark-red focus:ring-1 focus:ring-dark-red">
                  <option value="online">Онлайн</option>
                  <option value="offline">Офлайн</option>
                  <option value="hybrid">Гибридный (Онлайн и Офлайн)</option>
              </select>
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input id="consent" name="consent" type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="focus:ring-dark-red h-4 w-4 text-dark-red border-gray-500 rounded" />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="consent" className="font-medium text-gray-700">Я согласен(на) на обработку моих персональных данных.</label>
            </div>
          </div>
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-dark-red hover:bg-bordeaux focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-red disabled:bg-bordeaux disabled:opacity-50" disabled={!consent}>Начать тест</button>
        </form>
      </div>
    );
  }

  if (step === 'test') {
    if (isLoading || !currentQuestion) {
      return <div className="text-center p-10">Loading questions...</div>;
    }
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-black">
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-bordeaux">Level: {currentLevel}</span>
            <span className="text-sm font-medium text-bordeaux">Question {currentQuestionIndex + 1} of {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-dark-red h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <h2 className="text-2xl font-semibold my-6 text-black">{currentQuestion.questionText}</h2>
        <div className="space-y-4">
          {currentQuestion.options?.map((option, index) => (
            <label key={index} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${selectedOption === option ? 'border-dark-red bg-red-50 ring-2 ring-red-200' : 'border-black hover:bg-gray-100'}`}>
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
                className="h-4 w-4 text-dark-red border-gray-500 focus:ring-dark-red"
              />
              <span className="ml-3 text-black">{option}</span>
            </label>
          ))}
        </div>
        <button onClick={handleNextQuestion} disabled={!selectedOption} className="mt-8 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-dark-red hover:bg-bordeaux focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-red disabled:bg-bordeaux disabled:opacity-50">
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Section'}
        </button>
      </div>
    );
  }

  if (step === 'supplementary') {
    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-black space-y-8">
            <h2 className="text-2xl font-bold text-center text-dark-red">Supplementary Tasks</h2>
            
            {/* Writing Task */}
            <div className="p-6 border border-black rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-bordeaux">Writing Task</h3>
                <p className="text-gray-700 mb-4">{supplementaryTasks.writing?.prompt}</p>
                <textarea 
                    value={writingResponse}
                    onChange={(e) => setWritingResponse(e.target.value)}
                    rows={6}
                    className="w-full p-2 bg-white border border-black rounded-md focus:ring-dark-red focus:border-dark-red text-black"
                    placeholder="Type your response here..."
                />
            </div>

            {/* Speaking Task */}
            <div className="p-6 border border-black rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-bordeaux">Speaking Task</h3>
                <p className="text-gray-700 mb-4">{supplementaryTasks.speaking?.prompt}</p>
                <div className="flex items-center space-x-4">
                    {!isRecording ? (
                        <button onClick={startRecording} disabled={isRecording} className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            <MicrophoneIcon recording={false} /> <span className="ml-2">Start Recording</span>
                        </button>
                    ) : (
                        <button onClick={stopRecording} disabled={!isRecording} className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            <StopIcon /> <span className="ml-2">Stop Recording</span>
                        </button>
                    )}
                    {audioUrl && (
                        <div className="flex items-center space-x-2">
                           <audio src={audioUrl} controls />
                        </div>
                    )}
                </div>
                 <p className="text-xs text-gray-500 mt-2">Record your answer. You can re-record if you are not satisfied.</p>
            </div>

            <button onClick={handleFinishTest} className="mt-8 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-dark-red hover:bg-bordeaux focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-red">
                Submit Test
            </button>
        </div>
    );
  }

  if (step === 'complete') {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center bg-white rounded-xl shadow-lg border border-black">
        <h1 className="text-3xl font-bold text-dark-red mb-4">Thank You!</h1>
        <p className="text-gray-700 mb-2">Your test has been submitted successfully.</p>
        <p className="text-lg font-semibold text-black mb-4">Your preliminary level is: <span className="text-dark-red">{finalPreliminaryLevel}</span></p>
        <p className="text-gray-600">The final assessment will be assigned by a teacher after a manual review of your writing and speaking tasks. We will contact you shortly.</p>
      </div>
    );
  }

  return null;
};
