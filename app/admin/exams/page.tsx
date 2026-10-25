'use client';

import { useState } from 'react';
import { Plus, Check, FileQuestion, Trash2 } from 'lucide-react';

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

    const removeQuestion = (indexToRemove: number) => {
        setQuestions(questions.filter((_, idx) => idx !== indexToRemove));
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
        <div className="space-y-8 max-w-4xl">
            <div className="border-b border-[#EAE5E1] pb-5">
                <span className="text-xs uppercase tracking-wider font-bold text-[#F36A21]">Curriculum Management</span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#111111] tracking-tight mt-1">
                    Create Examination
                </h1>
                <p className="text-xs text-[#626262] mt-1">Configure timed question papers for students</p>
            </div>

            {message && (
                <div
                    className={`p-4 rounded-xl border text-xs font-semibold ${
                        message.includes('success')
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}
                >
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Exam Details */}
                <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EAE5E1] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-6">
                    <h3 className="text-base font-bold text-[#111111] pb-3 border-b border-[#F0EBE7]">
                        General Paper Information
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#111111] mb-1.5">Exam Title</label>
                            <input
                                type="text"
                                required
                                value={examData.title}
                                onChange={(e) => setExamData({ ...examData, title: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-[#FFFCFB] border border-[#EAE5E1] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#F36A21]"
                                placeholder="e.g. ICSE Class 10 Quadratic Equations Mock"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#111111] mb-1.5">Subject</label>
                            <select
                                required
                                value={examData.subject}
                                onChange={(e) => setExamData({ ...examData, subject: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-[#FFFCFB] border border-[#EAE5E1] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#F36A21]"
                            >
                                <option value="">Select Subject</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Physics">Physics</option>
                                <option value="Chemistry">Chemistry</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#111111] mb-1.5">Class / Level</label>
                            <select
                                required
                                value={examData.classLevel}
                                onChange={(e) => setExamData({ ...examData, classLevel: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-[#FFFCFB] border border-[#EAE5E1] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#F36A21]"
                            >
                                <option value="">Select Class</option>
                                <option value="Class 7">Class 7</option>
                                <option value="Class 8">Class 8</option>
                                <option value="Class 9">Class 9</option>
                                <option value="Class 10">Class 10</option>
                                <option value="Class 11">Class 11</option>
                                <option value="Class 12">Class 12</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#111111] mb-1.5">Duration (Minutes)</label>
                            <input
                                type="number"
                                required
                                value={examData.durationMinutes}
                                onChange={(e) => setExamData({ ...examData, durationMinutes: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-[#FFFCFB] border border-[#EAE5E1] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#F36A21]"
                                placeholder="60"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-[#111111] mb-1.5">Description & Guidelines</label>
                        <textarea
                            rows={3}
                            value={examData.description}
                            onChange={(e) => setExamData({ ...examData, description: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#FFFCFB] border border-[#EAE5E1] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#F36A21]"
                            placeholder="Coverage topics, formula sheet rules, and calculator policy..."
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#111111] mb-1.5">Total Marks</label>
                            <input
                                type="number"
                                required
                                value={examData.totalMarks}
                                onChange={(e) => setExamData({ ...examData, totalMarks: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-[#FFFCFB] border border-[#EAE5E1] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#F36A21]"
                                placeholder="100"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#111111] mb-1.5">Standalone Price (₹)</label>
                            <input
                                type="number"
                                required
                                value={examData.price}
                                onChange={(e) => setExamData({ ...examData, price: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-[#FFFCFB] border border-[#EAE5E1] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#F36A21]"
                                placeholder="0 for included, or 99"
                            />
                        </div>
                    </div>
                </div>

                {/* Add Questions Section */}
                <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EAE5E1] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-5">
                    <h3 className="text-base font-bold text-[#111111] pb-3 border-b border-[#F0EBE7]">
                        Question Builder
                    </h3>

                    <div>
                        <label className="block text-xs font-semibold text-[#111111] mb-1.5">Question Statement</label>
                        <textarea
                            rows={3}
                            value={currentQuestion.text}
                            onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#FFFCFB] border border-[#EAE5E1] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#F36A21]"
                            placeholder="Enter the mathematical problem statement or equation..."
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {currentQuestion.options.map((option, index) => (
                            <div key={index}>
                                <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                                    Option {String.fromCharCode(65 + index)}
                                </label>
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => {
                                        const newOptions = [...currentQuestion.options];
                                        newOptions[index] = e.target.value;
                                        setCurrentQuestion({ ...currentQuestion, options: newOptions });
                                    }}
                                    className="w-full px-3.5 py-2 bg-[#FFFCFB] border border-[#EAE5E1] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#F36A21]"
                                    placeholder={`Choice ${String.fromCharCode(65 + index)} value`}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#111111] mb-1.5">Correct Choice</label>
                            <select
                                value={currentQuestion.correctOption}
                                onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctOption: Number(e.target.value) })}
                                className="w-full px-3.5 py-2.5 bg-[#FFFCFB] border border-[#EAE5E1] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#F36A21]"
                            >
                                <option value={0}>Option A</option>
                                <option value={1}>Option B</option>
                                <option value={2}>Option C</option>
                                <option value={3}>Option D</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#111111] mb-1.5">Assigned Marks</label>
                            <input
                                type="number"
                                value={currentQuestion.marks}
                                onChange={(e) => setCurrentQuestion({ ...currentQuestion, marks: Number(e.target.value) })}
                                className="w-full px-3.5 py-2.5 bg-[#FFFCFB] border border-[#EAE5E1] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#F36A21]"
                                min="1"
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={addQuestion}
                        className="inline-flex items-center gap-1.5 bg-[#F36A21] hover:bg-[#DE5815] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Question to Roster</span>
                    </button>
                </div>

                {/* Questions List */}
                {questions.length > 0 && (
                    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EAE5E1] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE7]">
                            <h3 className="text-base font-bold text-[#111111]">
                                Enrolled Questions ({questions.length})
                            </h3>
                            <span className="text-xs font-semibold text-[#F36A21] bg-[#FFF4EC] px-2.5 py-1 rounded-full border border-[#F36A21]/20">
                                Total: {questions.reduce((sum, q) => sum + q.marks, 0)} Marks
                            </span>
                        </div>

                        <div className="space-y-3">
                            {questions.map((q, index) => (
                                <div key={index} className="p-4 bg-[#FFFCFB] border border-[#EAE5E1] rounded-xl">
                                    <div className="flex items-start justify-between gap-4">
                                        <p className="font-semibold text-xs text-[#111111]">
                                            Q{index + 1}: {q.text}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => removeQuestion(index)}
                                            className="text-rose-500 hover:text-rose-700 p-1 rounded transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="mt-3 grid sm:grid-cols-2 gap-2 text-xs">
                                        {q.options.map((opt, i) => (
                                            <span
                                                key={i}
                                                className={`p-2 rounded-lg border ${
                                                    i === q.correctOption
                                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold'
                                                        : 'bg-white text-[#626262] border-[#EAE5E1]'
                                                }`}
                                            >
                                                {String.fromCharCode(65 + i)}. {opt}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-[11px] text-[#858585] mt-2">Weightage: {q.marks} Marks</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting || questions.length === 0}
                    className="w-full bg-[#111111] hover:bg-[#F36A21] text-white py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-sm disabled:opacity-50"
                >
                    {isSubmitting ? 'Publishing Paper...' : 'Finalize & Publish Exam'}
                </button>
            </form>
        </div>
    );
}