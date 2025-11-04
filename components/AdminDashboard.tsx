import React, { useState } from 'react';
import { Question, Level } from '../types';
import { CloseIcon } from './Icons';

interface AdminDashboardProps {
  questions: Question[];
  addQuestion: (question: Question) => void;
  updateQuestion: (question: Question) => void;
  deleteQuestion: (questionId: string) => void;
}

const QuestionForm: React.FC<{ question?: Question; onSave: (q: Question) => void; onCancel: () => void }> = ({ question, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Question, 'questionId' | 'type'> & { questionId?: string }>({
    questionId: question?.questionId,
    questionText: question?.questionText || '',
    options: question?.options || ['', '', '', ''],
    correctAnswer: question?.correctAnswer || '',
    level: question?.level || 'A1-A2',
    topic: question?.topic || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.options?.includes(formData.correctAnswer)) {
        alert('The correct answer must be one of the options.');
        return;
    }
    const finalQuestion: Question = {
        ...formData,
        questionId: formData.questionId || `q_${new Date().getTime()}`,
        type: 'mcq',
        options: formData.options
    };
    onSave(finalQuestion);
  };
  
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(formData.options || [])];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">{question ? 'Edit Question' : 'Add New Question'}</h2>
                <button onClick={onCancel} className="text-slate-500 hover:text-slate-800"><CloseIcon /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-600">Question Text</label>
                    <textarea value={formData.questionText} onChange={e => setFormData({ ...formData, questionText: e.target.value })} rows={3} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                {formData.options?.map((opt, i) => (
                    <div key={i}>
                        <label className="block text-sm font-medium text-slate-600">Option {i + 1}</label>
                        <input type="text" value={opt} onChange={e => handleOptionChange(i, e.target.value)} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                ))}
                 <div>
                    <label className="block text-sm font-medium text-slate-600">Correct Answer</label>
                    <input type="text" value={formData.correctAnswer} onChange={e => setFormData({ ...formData, correctAnswer: e.target.value })} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required placeholder="Must match one of the options exactly" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-600">Level</label>
                        <select value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value as Level })} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="A1-A2">A1-A2</option>
                            <option value="B1-B2">B1-B2</option>
                            <option value="C1-C2">C1-C2</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600">Topic</label>
                        <input type="text" value={formData.topic} onChange={e => setFormData({ ...formData, topic: e.target.value })} className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onCancel} className="px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
                    <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save Question</button>
                </div>
            </form>
        </div>
    </div>
  );
};


export const AdminDashboard: React.FC<AdminDashboardProps> = ({ questions, addQuestion, updateQuestion, deleteQuestion }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | undefined>(undefined);
  const [filterLevel, setFilterLevel] = useState<Level | 'all'>('all');
  const [filterTopic, setFilterTopic] = useState('');

  const handleSave = (question: Question) => {
    if (editingQuestion) {
      updateQuestion(question);
    } else {
      addQuestion(question);
    }
    setShowForm(false);
    setEditingQuestion(undefined);
  };
  
  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingQuestion(undefined);
    setShowForm(true);
  }

  const filteredQuestions = questions.filter(q => 
    (filterLevel === 'all' || q.level === filterLevel) &&
    (filterTopic === '' || q.topic.toLowerCase().includes(filterTopic.toLowerCase()))
  );
  
  const topics = [...new Set(questions.map(q => q.topic))];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md h-[calc(100vh-8rem)] flex flex-col">
      {showForm && <QuestionForm question={editingQuestion} onSave={handleSave} onCancel={() => { setShowForm(false); setEditingQuestion(undefined); }} />}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Question Bank</h2>
        <button onClick={handleAddNew} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-semibold">Add New Question</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <select onChange={e => setFilterLevel(e.target.value as Level | 'all')} value={filterLevel} className="p-2 border border-slate-300 rounded-md">
          <option value="all">All Levels</option>
          <option value="A1-A2">A1-A2</option>
          <option value="B1-B2">B1-B2</option>
          <option value="C1-C2">C1-C2</option>
        </select>
        <input type="text" placeholder="Filter by topic..." value={filterTopic} onChange={e => setFilterTopic(e.target.value)} className="p-2 border border-slate-300 rounded-md" />
      </div>

      <div className="flex-grow overflow-y-auto">
        <div className="space-y-4">
          {filteredQuestions.map(q => (
            <div key={q.questionId} className="p-4 border border-slate-200 rounded-lg">
              <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-slate-800">{q.questionText}</p>
                    <p className="text-sm text-slate-500 mt-1">
                        <span className="font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs">{q.level}</span>
                        <span className="ml-2 font-mono bg-sky-100 text-sky-600 px-2 py-0.5 rounded text-xs">{q.topic}</span>
                    </p>
                    <p className="text-sm text-green-600 mt-2">Correct: {q.correctAnswer}</p>
                  </div>
                  <div className="flex space-x-2 flex-shrink-0">
                      <button onClick={() => handleEdit(q)} className="px-3 py-1 text-sm bg-yellow-400 text-yellow-900 rounded hover:bg-yellow-500">Edit</button>
                      <button onClick={() => deleteQuestion(q.questionId)} className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
