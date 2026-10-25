'use client';

import { useState } from 'react';

interface Question {
    text: string;
    options: string[];
    correctOption: number;
    marks: number;
}

export default function AdminExamsPage() {
    const [examData, setExamData] = useState({
        title: '',
        description: '',
        subject: '',
        classLevel: '',
        durationMinutes: '',
        totalMarks: '',
        price: ''
    });
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        text: '',
        options: ['', '', '', ''],
        correctOption: 0,
        marks: 1
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const addQuestion = () => {
        if (currentQuestion.text && currentQuestion.options.every(opt => opt.trim())) {
            setQuestions([...questions, currentQuestion]);
            setCurrentQuestion({
                text: '',
                options: ['', '', '', ''],
                correctOption: 0,
                marks: 1
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (questions.length === 0) {
            setMessage('Please add at least one question');
            return;
        }

        setIsSubmitting(true);
        setMessage('');

        try {
            const response = await fetch('/api/admin/exams', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...examData,
                    durationMinutes: Number(examData.durationMinutes),
                    totalMarks: Number(examData.totalMarks),
                    price: Number(examData.price),
                    questions
                })
            });

            if (response.ok) {
                setMessage('Exam created successfully!');
                setExamData({
                    title: '',
                    description: '',
                    subject: '',
                    classLevel: '',
                    durationMinutes: '',
                    totalMarks: '',
                    price: ''
                });
                setQuestions([]);
            } else {
                setMessage('Failed to create exam');
            }
        } catch (error) {
            setMessage('Error creating exam');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Create Exam</h1>
                <p className="text-gray-500 mt-2">Create a new exam with questions</p>
            </div>

            {message && (
                <div className={`p-4 rounded-md ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Exam Details */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Exam Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Exam Title</label>
                            <input
                                type="text"
                                required
                                value={examData.title}
                                onChange={(e) => setExamData({...examData, title: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Mid-term Mathematics Exam"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                            <select
                                required
                                value={examData.subject}
                                onChange={(e) => setExamData({...examData, subject: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select Subject</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Physics">Physics</option>
                                <option value="Chemistry">Chemistry</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Class Level</label>
                            <select
                                required
                                value={examData.classLevel}
                                onChange={(e) => setExamData({...examData, classLevel: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select Class</option>
                                <option value="Class 9">Class 9</option>
                                <option value="Class 10">Class 10</option>
                                <option value="Class 11">Class 11</option>
                                <option value="Class 12">Class 12</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                            <input
                                type="number"
                                required
                                value={examData.durationMinutes}
                                onChange={(e) => setExamData({...examData, durationMinutes: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="60"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            rows={3}
                            value={examData.description}
                            onChange={(e) => setExamData({...examData, description: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Exam description..."
                        />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks</label>
                            <input
                                type="number"
                                required
                                value={examData.totalMarks}
                                onChange={(e) => setExamData({...examData, totalMarks: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                            <input
                                type="number"
                                required
                                value={examData.price}
                                onChange={(e) => setExamData({...examData, price: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="99"
                            />
                        </div>
                    </div>
                </div>

                {/* Add Questions */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Add Question</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
                            <textarea
                                rows={3}
                                value={currentQuestion.text}
                                onChange={(e) => setCurrentQuestion({...currentQuestion, text: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your question here..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {currentQuestion.options.map((option, index) => (
                                <div key={index}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Option {index + 1}</label>
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => {
                                            const newOptions = [...currentQuestion.options];
                                            newOptions[index] = e.target.value;
                                            setCurrentQuestion({...currentQuestion, options: newOptions});
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder={`Option ${index + 1}`}
                                    />
                                </div>
                            ))}\n                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Correct Option</label>
                                <select
                                    value={currentQuestion.correctOption}
                                    onChange={(e) => setCurrentQuestion({...currentQuestion, correctOption: Number(e.target.value)})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value={0}>Option 1</option>
                                    <option value={1}>Option 2</option>
                                    <option value={2}>Option 3</option>
                                    <option value={3}>Option 4</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Marks</label>
                                <input
                                    type="number"
                                    value={currentQuestion.marks}
                                    onChange={(e) => setCurrentQuestion({...currentQuestion, marks: Number(e.target.value)})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    min="1"
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={addQuestion}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                        >
                            Add Question
                        </button>
                    </div>
                </div>

                {/* Questions List */}
                {questions.length > 0 && (
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h3 className="text-lg font-semibold mb-4">Questions Added ({questions.length})</h3>
                        <div className="space-y-4">
                            {questions.map((q, index) => (
                                <div key={index} className="p-4 border border-gray-200 rounded-md">
                                    <p className="font-medium">Q{index + 1}: {q.text}</p>
                                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                        {q.options.map((opt, i) => (
                                            <span key={i} className={`${i === q.correctOption ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
                                                {i + 1}. {opt}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Marks: {q.marks}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting || questions.length === 0}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 transition"
                >
                    {isSubmitting ? 'Creating Exam...' : 'Create Exam'}
                </button>
            </form>
        </div>
    );
}