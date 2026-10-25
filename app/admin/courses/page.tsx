'use client';

import { useState, useEffect } from 'react';

interface Course {
    _id: string;
    title: string;
    description: string;
    subject: string;
    classLevel: string;
    price: number;
    duration: string;
}

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subject: '',
        classLevel: '',
        price: '',
        duration: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('/api/admin/courses');
            if (response.ok) {
                const data = await response.json();
                setCourses(data.courses);
            }
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const url = editingCourse 
                ? `/api/admin/courses/${editingCourse._id}`
                : '/api/admin/courses';
            const method = editingCourse ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setMessage(editingCourse ? 'Course updated successfully!' : 'Course created successfully!');
                setFormData({
                    title: '',
                    description: '',
                    subject: '',
                    classLevel: '',
                    price: '',
                    duration: ''
                });
                setEditingCourse(null);
                fetchCourses();
            } else {
                setMessage('Failed to save course');
            }
        } catch (error) {
            setMessage('Error saving course');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (course: Course) => {
        setEditingCourse(course);
        setFormData({
            title: course.title,
            description: course.description,
            subject: course.subject,
            classLevel: course.classLevel,
            price: course.price.toString(),
            duration: course.duration
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this course?')) return;

        try {
            const response = await fetch(`/api/admin/courses/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setMessage('Course deleted successfully!');
                fetchCourses();
            }
        } catch (error) {
            setMessage('Error deleting course');
        }
    };

    const resetForm = () => {
        setEditingCourse(null);
        setFormData({
            title: '',
            description: '',
            subject: '',
            classLevel: '',
            price: '',
            duration: ''
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    {editingCourse ? 'Edit Course' : 'Create Course'}
                </h1>
                <p className="text-gray-500 mt-2">
                    {editingCourse ? 'Update course details' : 'Add a new course to the platform'}
                </p>
            </div>

            {message && (
                <div className={`p-4 rounded-md ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 bg-white p-6 rounded-xl border border-gray-200">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Advanced Mathematics"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Course description..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                        <select
                            required
                            value={formData.subject}
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
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
                            value={formData.classLevel}
                            onChange={(e) => setFormData({...formData, classLevel: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Class</option>
                            <option value="Class 9">Class 9</option>
                            <option value="Class 10">Class 10</option>
                            <option value="Class 11">Class 11</option>
                            <option value="Class 12">Class 12</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                        <input
                            type="number"
                            required
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="999"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                        <input
                            type="text"
                            required
                            value={formData.duration}
                            onChange={(e) => setFormData({...formData, duration: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="3 months"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 transition"
                    >
                        {isSubmitting ? 'Saving...' : (editingCourse ? 'Update Course' : 'Create Course')}
                    </button>
                    {editingCourse && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Courses List */}
            <div className="bg-white rounded-xl border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Existing Courses ({courses.length})</h3>
                </div>
                <div className="divide-y divide-gray-200">
                    {courses.map((course) => (
                        <div key={course._id} className="p-6 flex items-center justify-between">
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{course.title}</h4>
                                <p className="text-sm text-gray-500">{course.subject} • {course.classLevel} • ₹{course.price}</p>
                                <p className="text-xs text-gray-400 mt-1">{course.duration}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(course)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(course._id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}