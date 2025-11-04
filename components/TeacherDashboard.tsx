import React, { useState } from 'react';
import { Submission, BlockResult, Answer } from '../types';

interface TeacherDashboardProps {
  submissions: Submission[];
  updateSubmission: (updatedSubmission: Submission) => void;
}

const AnswerDetails: React.FC<{ answer: Answer }> = ({ answer }) => {
  const isCorrect = answer.isCorrect;
  const bgColor = isCorrect ? 'bg-green-50' : 'bg-red-50';
  const textColor = isCorrect ? 'text-green-700' : 'text-red-700';

  return (
    <div className={`p-3 border-l-4 ${isCorrect ? 'border-green-500' : 'border-red-500'} ${bgColor} rounded`}>
      <p className="font-medium text-slate-700">{answer.questionText}</p>
      <p className="text-sm text-slate-500 mt-1">Your answer: <span className="font-semibold text-slate-800">{answer.studentAnswer}</span></p>
      {!isCorrect && <p className="text-sm text-slate-500">Correct answer: <span className="font-semibold text-green-800">{answer.correctAnswer}</span></p>}
    </div>
  );
};

const BlockDetails: React.FC<{ block: BlockResult }> = ({ block }) => {
  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold text-slate-800">Level: {block.level}</h4>
      <p className="text-slate-600">Score: {block.score} / {block.total} ({((block.score / block.total) * 100).toFixed(0)}%)</p>
      <div className="mt-2 space-y-2">
        {block.questions.map((ans, idx) => <AnswerDetails key={idx} answer={ans} />)}
      </div>
    </div>
  );
};

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ submissions, updateSubmission }) => {
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);

  const selectedSubmission = submissions.find(s => s.submissionId === selectedSubmissionId);

  const handleUpdate = (field: keyof Submission | 'teacherComments' | 'finalLevel' | 'status', value: any) => {
    if (selectedSubmission) {
      const updated = { ...selectedSubmission, [field]: value };
      updateSubmission(updated);
    }
  };

  if (submissions.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-slate-700">No submissions yet.</h2>
        <p className="text-slate-500 mt-2">When students complete the test, their results will appear here.</p>
      </div>
    );
  }

  return (
    <div className="flex space-x-6 h-[calc(100vh-8rem)]">
      {/* Submissions List */}
      <div className="w-1/3 bg-white p-4 rounded-lg shadow-md overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-slate-800">Submissions</h2>
        <ul className="space-y-2">
          {submissions.map(sub => (
            <li key={sub.submissionId} onClick={() => setSelectedSubmissionId(sub.submissionId)} className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedSubmissionId === sub.submissionId ? 'bg-indigo-100 text-indigo-900' : 'hover:bg-slate-100'}`}>
              <div className="font-semibold">{sub.student.name}</div>
              <div className="text-sm text-slate-500">{new Date(sub.createdAt).toLocaleString()}</div>
              <div className={`text-xs font-medium inline-block px-2 py-1 rounded-full mt-1 ${sub.status === 'checked' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {sub.status.replace('_', ' ')}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Submission Details */}
      <div className="w-2/3 bg-white p-6 rounded-lg shadow-md overflow-y-auto">
        {selectedSubmission ? (
          <div>
            <div className="pb-4 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800">{selectedSubmission.student.name}</h2>
              <p className="text-slate-500">Age: {selectedSubmission.student.age} | Submitted: {new Date(selectedSubmission.createdAt).toLocaleString()}</p>
              <p className="text-slate-500 mt-2">Preliminary Level: <span className="font-bold text-indigo-600">{selectedSubmission.preliminaryLevel}</span></p>
            </div>
            
            <div className="py-4 border-b border-slate-200">
                <h3 className="text-xl font-semibold mb-2 text-slate-700">Student's Goals & Concerns</h3>
                <p className="text-sm text-slate-600"><strong className="font-medium">Goals:</strong> {selectedSubmission.student.goals}</p>
                <p className="text-sm text-slate-600 mt-1"><strong className="font-medium">Fears/Challenges:</strong> {selectedSubmission.student.fears}</p>
                <p className="text-sm text-slate-600 mt-1"><strong className="font-medium">Preferred Format:</strong> {selectedSubmission.student.format}</p>
            </div>

            <div className="py-4 border-b border-slate-200">
                <h3 className="text-xl font-semibold mb-2 text-slate-700">Supplementary Tasks</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold">Writing Response</h4>
                        <p className="text-sm text-slate-500 italic mb-2">Prompt: "{selectedSubmission.supplementaryTasks.writing?.prompt}"</p>
                        <p className="p-3 bg-slate-50 rounded border border-slate-200 text-slate-700 whitespace-pre-wrap">{selectedSubmission.supplementaryTasks.writing?.response || 'No response.'}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Speaking Response</h4>
                         <p className="text-sm text-slate-500 italic mb-2">Prompt: "{selectedSubmission.supplementaryTasks.speaking?.prompt}"</p>
                        {selectedSubmission.supplementaryTasks.speaking?.audioUrl ? (
                            <audio controls src={selectedSubmission.supplementaryTasks.speaking.audioUrl} className="w-full">Your browser does not support the audio element.</audio>
                        ) : <p className="text-slate-500">No audio recorded.</p>}
                    </div>
                </div>
            </div>

            <div className="py-4 border-b border-slate-200">
                <h3 className="text-xl font-semibold mb-2 text-slate-700">Teacher Review</h3>
                <div className="space-y-4">
                     <div>
                        <label htmlFor="finalLevel" className="block text-sm font-medium text-slate-700">Final Level</label>
                        <select id="finalLevel" value={selectedSubmission.finalLevel || ''} onChange={e => handleUpdate('finalLevel', e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="">Select a level</option>
                            <option value="A1">A1</option>
                            <option value="A2">A2</option>
                            <option value="B1">B1</option>
                            <option value="B2">B2</option>
                            <option value="C1">C1</option>
                            <option value="C2">C2</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="teacherComments" className="block text-sm font-medium text-slate-700">Comments</label>
                        <textarea id="teacherComments" rows={4} value={selectedSubmission.teacherComments || ''} onChange={e => handleUpdate('teacherComments', e.target.value)} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>
                     <div>
                        <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
                         <select id="status" value={selectedSubmission.status} onChange={e => handleUpdate('status', e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            <option value="awaiting_review">Awaiting Review</option>
                            <option value="checked">Checked</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="py-4">
              <h3 className="text-xl font-semibold text-slate-700">Test Breakdown</h3>
              {selectedSubmission.blocks.map((block, idx) => <BlockDetails key={idx} block={block} />)}
            </div>
            
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-500 text-lg">Select a submission to view details.</p>
          </div>
        )}
      </div>
    </div>
  );
};
