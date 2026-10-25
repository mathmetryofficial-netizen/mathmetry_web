import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function CoursesPage() {
    return (
        <div className="min-h-screen bg-[#F7F8FC] flex justify-center p-4 md:p-8 font-sans">
            <div className="w-full max-w-[1400px] bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col min-h-[90vh]">

                <Navbar />

                <main className="flex-1 p-8 md:p-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-6">Our Courses</h1>
                    <p className="text-lg text-slate-600 mb-8 max-w-2xl">
                        Explore our comprehensively designed mathematics courses tailored for various grade levels and competitive exams.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {['Algebra Mastery', 'Calculus Fundamentals', 'Geometry & Trigonometry', 'Competitive Math', 'Statistics 101'].map((course) => (
                            <div key={course} className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer bg-slate-50">
                                <div className="h-40 bg-slate-200 rounded-xl mb-4 flex items-center justify-center text-slate-400">
                                    Course Thumbnail
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{course}</h3>
                                <p className="text-slate-500 text-sm mb-4">Comprehensive modules, practice tests, and expert guidance.</p>
                                <Link href="/auth/signup" className="text-indigo-600 font-bold text-sm hover:underline">
                                    View Details →
                                </Link>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
