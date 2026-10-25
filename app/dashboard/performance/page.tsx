'use client';

export default function PerformancePage() {
    // In a real app, fetch from API. Mocking for UI demonstration.
    const performanceData = {
        totalExams: 5,
        averageScore: 78,
        timeSpent: '12h 30m',
        history: [
            { id: 1, title: 'Algebra Basics', date: '2025-10-12', score: 85, total: 100 },
            { id: 2, title: 'Calculus I', date: '2025-10-15', score: 60, total: 100 },
            { id: 3, title: 'Trigonometry', date: '2025-10-18', score: 92, total: 100 },
            { id: 4, title: 'Geometry', date: '2025-10-20', score: 75, total: 100 },
            { id: 5, title: 'Probability', date: '2025-10-25', score: 80, total: 100 },
        ]
    };

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Performance Analytics</h1>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                    <p className="text-sm font-medium text-slate-500 mb-1">Average Score</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{performanceData.averageScore}%</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                    <p className="text-sm font-medium text-slate-500 mb-1">Exams Taken</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{performanceData.totalExams}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                    <p className="text-sm font-medium text-slate-500 mb-1">Total Time Spent</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{performanceData.timeSpent}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden dark:bg-slate-800 dark:border-slate-700">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="font-bold text-lg">Exam History</h2>
                </div>
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-700 font-medium dark:bg-slate-700 dark:text-slate-300">
                        <tr>
                            <th className="px-6 py-3">Exam Title</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Score</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {performanceData.history.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                <td className="px-6 py-3 font-medium">{item.title}</td>
                                <td className="px-6 py-3 text-slate-500">{item.date}</td>
                                <td className="px-6 py-3 font-semibold">
                                    {item.score}/{item.total}
                                </td>
                                <td className="px-6 py-3">
                                    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${item.score >= 40
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>
                                        {item.score >= 40 ? 'Passed' : 'Failed'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
