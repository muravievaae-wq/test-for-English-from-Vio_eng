import React, { useState } from 'react';
import { Submission, Question } from './types';
import { ACCESS_CODE } from './constants';
import { questionBank } from './services/questionBank';
import { TestFlow } from './components/TestFlow';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminIcon, CloseIcon, TeacherIcon, TestIcon } from './components/Icons';

type View = 'home' | 'test' | 'teacher' | 'admin';
type Role = 'teacher' | 'admin';

const LoginModal: React.FC<{ role: Role; onLogin: () => void; onCancel: () => void }> = ({ role, onLogin, onCancel }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would be an API call to a backend endpoint:
        // POST /login with { role, code } returning a JWT.
        if (code === ACCESS_CODE) {
            onLogin();
        } else {
            setError('Invalid access code.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm relative">
                <button onClick={onCancel} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <CloseIcon />
                </button>
                <h2 className="text-2xl font-bold text-center mb-2 text-slate-800">
                    {role === 'teacher' ? 'Teacher Login' : 'Admin Login'}
                </h2>
                <p className="text-center text-slate-500 mb-6">Enter the access code to continue.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={code}
                        onChange={(e) => { setCode(e.target.value); setError(''); }}
                        className="w-full px-4 py-2 border border-slate-300 rounded-md text-center text-lg tracking-widest focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="••••••••"
                    />
                    {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                    <button type="submit" className="w-full mt-6 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                        Enter
                    </button>
                </form>
            </div>
        </div>
    );
};


const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [showLogin, setShowLogin] = useState<Role | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [questions, setQuestions] = useState<Question[]>(questionBank);

  const handleTestComplete = (submission: Submission) => {
    setSubmissions(prev => [...prev, submission]);
    setView('home');
  };
  
  const updateSubmission = (updatedSubmission: Submission) => {
      setSubmissions(subs => subs.map(s => s.submissionId === updatedSubmission.submissionId ? updatedSubmission : s));
  };
  
  const addQuestion = (question: Question) => setQuestions(prev => [...prev, question]);
  const updateQuestion = (updatedQuestion: Question) => setQuestions(prev => prev.map(q => q.questionId === updatedQuestion.questionId ? updatedQuestion : q));
  const deleteQuestion = (questionId: string) => setQuestions(prev => prev.filter(q => q.questionId !== questionId));


  const renderView = () => {
    switch (view) {
      case 'test':
        return <TestFlow onTestComplete={handleTestComplete} />;
      case 'teacher':
        return <TeacherDashboard submissions={submissions} updateSubmission={updateSubmission} />;
      case 'admin':
        return <AdminDashboard questions={questions} addQuestion={addQuestion} updateQuestion={updateQuestion} deleteQuestion={deleteQuestion}/>;
      case 'home':
      default:
        return (
          <div className="text-center">
            <h1 className="text-5xl font-bold text-slate-800">Welcome to the English Placement Test</h1>
            <p className="text-xl text-slate-500 mt-4 max-w-2xl mx-auto">
              This adaptive test will help determine your English proficiency level from A1 to C2.
            </p>
            <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-6">
              <button onClick={() => setView('test')} className="flex items-center justify-center w-64 px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transform hover:-translate-y-1 transition-all duration-300">
                <TestIcon /> Test (for students)
              </button>
              <button onClick={() => setShowLogin('teacher')} className="flex items-center justify-center w-64 px-8 py-4 bg-slate-700 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-slate-800 transform hover:-translate-y-1 transition-all duration-300">
                <TeacherIcon /> Results (for teacher)
              </button>
              <button onClick={() => setShowLogin('admin')} className="flex items-center justify-center w-64 px-8 py-4 bg-slate-700 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-slate-800 transform hover:-translate-y-1 transition-all duration-300">
                <AdminIcon /> Admin - Question Bank
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600 cursor-pointer" onClick={() => setView('home')}>
            English Test Portal
          </div>
           {view !== 'home' && (
              <button onClick={() => setView('home')} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600">
                &larr; Back to Home
              </button>
            )}
        </nav>
      </header>
      <main className="container mx-auto px-6 py-8 flex items-center justify-center" style={{minHeight: 'calc(100vh - 72px)'}}>
        {renderView()}
      </main>
      {showLogin && (
        <LoginModal
          role={showLogin}
          onLogin={() => {
            setView(showLogin);
            setShowLogin(null);
          }}
          onCancel={() => setShowLogin(null)}
        />
      )}
    </div>
  );
};

export default App;
