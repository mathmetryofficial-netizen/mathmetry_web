'use client';

import { useState, useEffect } from 'react';

interface Material {
    _id: string;
    title: string;
    subject: string;
    type: 'pdf' | 'text' | 'video_link';
    classLevel: string;
    fileUrl?: string;
    content?: string;
    createdAt: string;
}

export default function MaterialsPage() {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/materials')
            .then((res) => res.json())
            .then((data) => {
                setMaterials(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Study Materials</h1>

                {/* Filter controls could go here */}
                <div className="flex gap-2">
                    <select className="border border-slate-300 rounded-md px-3 py-1 text-sm dark:bg-slate-800 dark:border-slate-700">
                        <option>All Subjects</option>
                        <option>Mathematics</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {materials.map((item) => (
                    <div key={item._id} className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow dark:bg-slate-800 dark:border-slate-700">
                        <div className="flex justify-between items-start mb-2">
                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${item.type === 'pdf' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                    item.type === 'video_link' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                        'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                                }`}>
                                {item.type.toUpperCase()}
                            </span>
                            <span className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>

                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 truncate">{item.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{item.subject} • {item.classLevel}</p>

                        <button className="w-full py-2 px-4 bg-slate-50 text-slate-900 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-100 transition dark:bg-slate-700 dark:text-white dark:border-slate-600 dark:hover:bg-slate-600">
                            View Material
                        </button>
                    </div>
                ))}

                {materials.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-500">
                        No materials found.
                    </div>
                )}
            </div>
        </div>
    );
}
