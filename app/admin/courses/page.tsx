'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Edit2, Trash2, Plus, Clock, Tag } from 'lucide-react';

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
                setCourses(data.courses || []);
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
        <div className="space-y-8 max-w-4xl">
            <div className="border-b border-[#EAE5E1] pb-5">
                <span className="text-xs uppercase tracking-wider font-bold text-[#F36A21]">Academic Catalog</span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#111111] tracking-tight mt-1">
                    {editingCourse ? 'Edit Curriculum Course' : 'Create Curriculum Course'}
                </h1>
                <p className="text-xs text-[#626262] mt-1">
                    {editingCourse ? 'Modify course syllabus, pricing, and assigned level' : 'Enroll a new video and problem-solving module onto Mathmetry'}
                </p>
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

            <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EAE5E1] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-6">
                <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1.5">Course Title</label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FFFCFB] border border-[#EAE5E1] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#F36A21]"
                        placeholder="e.g. Class 10 ICSE Board Sprint Course"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1.5">Course Overview & Syllabus</label>
                    <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FFFCFB] border border-[#EAE5E1] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#F36A21]"
                        placeholder="Comprehensive chapter breakdown, theorem derivations, and homework schedules..."
                    />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-[#111111] mb-1.5">Subject</label>
                        <select
                            required
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#FFFCFB] border border-[#EAE5E1] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#F36A21]"
                        >
                            <option value="">Select Subject</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-[#111111] mb-1.5">Class / Board Level</label>
                        <select
                            required
                            value={formData.classLevel}
                            onChange={(e) => setFormData({ ...formData, classLevel: e.target.value })}
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
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-[#111111] mb-1.5">Enrollment Fee (₹)</label>
                        <input
                            type="number"
                            required
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#FFFCFB] border border-[#EAE5E1] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#F36A21]"
                            placeholder="999"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-[#111111] mb-1.5">Pacing / Duration</label>
                        <input
                            type="text"
                            required
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#FFFCFB] border border-[#EAE5E1] rounded-xl text-xs text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#F36A21]"
                            placeholder="e.g. 12 Weeks • 48 Lessons"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#111111] hover:bg-[#F36A21] text-white py-2.5 px-6 rounded-xl text-xs font-bold transition shadow-sm disabled:opacity-50"
                    >
                        {isSubmitting ? 'Saving Course...' : editingCourse ? 'Update Course' : 'Create Course'}
                    </button>
                    {editingCourse && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="bg-[#F9F5F1] text-[#626262] hover:text-[#111111] py-2.5 px-5 rounded-xl text-xs font-semibold border border-[#EAE5E1] transition"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            {/* Courses List */}
            <div className="bg-white rounded-2xl border border-[#EAE5E1] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#EAE5E1] bg-[#F9F5F1] flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-sm text-[#111111]">Active Courses</h3>
                        <p className="text-xs text-[#626262]">Curriculum packages visible to students</p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-[#626262] border border-[#EAE5E1]">
                        {courses.length} Listed
                    </span>
                </div>

                <div className="divide-y divide-[#F0EBE7]">
                    {courses.map((course) => (
                        <div key={course._id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FFFCFB] transition-colors">
                            <div className="flex-1">
                                <h4 className="font-bold text-sm text-[#111111]">{course.title}</h4>
                                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-[#626262]">
                                    <span className="px-2 py-0.5 rounded-full bg-[#FFF4EC] text-[#F36A21] font-semibold border border-[#F36A21]/20">
                                        {course.subject}
                                    </span>
                                    <span>•</span>
                                    <span>{course.classLevel}</span>
                                    <span>•</span>
                                    <span className="font-bold text-[#111111]">₹{course.price}</span>
                                    <span>•</span>
                                    <span>{course.duration}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEdit(course)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#EAE5E1] text-xs font-semibold text-[#111111] hover:bg-[#F9F5F1] transition"
                                >
                                    <Edit2 className="w-3.5 h-3.5 text-[#F36A21]" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    onClick={() => handleDelete(course._id)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))}

                    {courses.length === 0 && (
                        <div className="p-10 text-center text-xs text-[#858585]">
                            No courses enrolled yet. Use the form above to publish your first course.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}