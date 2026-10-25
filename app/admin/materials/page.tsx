'use client';

import { useState, useEffect } from 'react';
import { useLoading } from '@/components/LoadingProvider';

interface Material {
    _id: string;
    title: string;
    description: string;
    subject: string;
    classLevel: string;
    board: string;
    chapter: string;
    type: string;
    fileUrl: string;
    previewUrl?: string;
    price: number;
}

export default function AdminMaterialsPage() {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subject: '',
        classLevel: '',
        board: '',
        chapter: '',
        fileUrl: '',
        previewUrl: '',
        materialType: 'pdf',
        price: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const { showLoader, hideLoader } = useLoading();

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const response = await fetch('/api/admin/materials');
            if (response.ok) {
                const data = await response.json();
                setMaterials(data.materials);
            }
        } catch (error) {
            console.error('Failed to fetch materials:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');
        showLoader();

        try {
            console.log('Submitting form data:', formData);

            const url = editingMaterial
                ? `/api/admin/materials/${editingMaterial._id}`
                : '/api/admin/materials';
            const method = editingMaterial ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            console.log('API response:', result);

            if (response.ok) {
                setMessage(editingMaterial ? 'Material updated successfully!' : 'Material added successfully!');
                setFormData({
                    title: '',
                    description: '',
                    subject: '',
                    classLevel: '',
                    board: '',
                    chapter: '',
                    fileUrl: '',
                    previewUrl: '',
                    materialType: 'pdf',
                    price: ''
                });
                setEditingMaterial(null);
                fetchMaterials();
            } else {
                setMessage('Failed to save material');
            }
        } catch (error) {
            console.error('Submit error:', error);
            setMessage('Error saving material');
        } finally {
            setIsSubmitting(false);
            hideLoader();
        }
    };

    const handleEdit = (material: Material) => {
        setEditingMaterial(material);
        setFormData({
            title: material.title,
            description: material.description,
            subject: material.subject,
            classLevel: material.classLevel,
            board: material.board || '',
            chapter: material.chapter || '',
            fileUrl: material.fileUrl,
            previewUrl: material.previewUrl || '',
            materialType: material.type,
            price: material.price?.toString() || ''
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this material?')) return;

        try {
            const response = await fetch(`/api/admin/materials/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setMessage('Material deleted successfully!');
                fetchMaterials();
            }
        } catch (error) {
            setMessage('Error deleting material');
        }
    };

    const resetForm = () => {
        setEditingMaterial(null);
        setFormData({
            title: '',
            description: '',
            subject: '',
            classLevel: '',
            board: '',
            chapter: '',
            fileUrl: '',
            previewUrl: '',
            materialType: 'pdf',
            price: ''
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    {editingMaterial ? 'Edit Material' : 'Add Study Material'}
                </h1>
                <p className="text-gray-500 mt-2">
                    {editingMaterial ? 'Update material details' : 'Upload new study materials for students'}
                </p>
            </div>

            {message && (
                <div className={`p-4 rounded-md ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Material Title</label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Algebra Chapter 1 - Linear Equations"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        required
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Brief description of the material..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Class Level</label>
                        <select
                            required
                            value={formData.classLevel}
                            onChange={(e) => setFormData({ ...formData, classLevel: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Class</option>
                            <option value="6">Class 6</option>
                            <option value="7">Class 7</option>
                            <option value="8">Class 8</option>
                            <option value="9">Class 9</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Board</label>
                        <select
                            required
                            value={formData.board}
                            onChange={(e) => setFormData({ ...formData, board: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Board</option>
                            <option value="WB">West Bengal Board (WB)</option>
                            <option value="ICSE">ICSE</option>
                            <option value="CBSE">CBSE</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                        <select
                            required
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Subject</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Chapter Name</label>
                        <input
                            type="text"
                            required
                            value={formData.chapter}
                            onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g. Polynomials"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">File URL (Actual Material)</label>
                        <input
                            type="url"
                            required
                            value={formData.fileUrl}
                            onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="https://example.com/material.pdf"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preview URL (Free Preview)</label>
                        <input
                            type="url"
                            value={formData.previewUrl}
                            onChange={(e) => setFormData({ ...formData, previewUrl: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="https://example.com/preview.pdf"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                        <input
                            type="number"
                            required
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="99"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Material Type</label>
                        <select
                            value={formData.materialType}
                            onChange={(e) => setFormData({ ...formData, materialType: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="pdf">PDF</option>
                            <option value="video_link">Video</option>
                            <option value="text">Document</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#F36A21] text-white py-2.5 px-6 rounded-full hover:bg-[#DE5815] disabled:opacity-50 transition shadow-xs font-semibold text-xs"
                    >
                        {isSubmitting ? 'Saving...' : (editingMaterial ? 'Update Material' : 'Add Material')}
                    </button>
                    {editingMaterial && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="bg-white border border-[#EAE5E1] text-[#111111] py-2.5 px-6 rounded-full hover:bg-[#F9F5F1] transition font-semibold text-xs"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Materials List */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900">Existing Materials ({materials.length})</h3>
                </div>
                <div className="divide-y divide-gray-200">
                    {materials.map((material) => (
                        <div key={material._id} className="p-6 flex items-start justify-between hover:bg-gray-50 transition-colors">
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 text-lg mb-1">{material.title}</h4>
                                <div className="flex flex-wrap gap-2 text-sm mb-2">
                                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">Class {material.classLevel}</span>
                                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">{material.board}</span>
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">{material.subject}</span>
                                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{material.chapter || 'No Chapter'}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-1">{material.description}</p>
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">Type:</span> {material.type} | <span className="font-medium">Price:</span> ₹{material.price || 0}
                                </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                                <button
                                    onClick={() => handleEdit(material)}
                                    className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-sm hover:bg-gray-50 transition font-medium"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(material._id)}
                                    className="bg-red-50 text-red-600 border border-red-100 px-3 py-1.5 rounded-md text-sm hover:bg-red-100 transition font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    {materials.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            No materials uploaded yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}