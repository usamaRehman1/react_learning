import React, { use, useEffect, useState } from 'react';
import { User, Mail, Phone, BookOpen, MapPin, Calendar, GraduationCap, Loader2, CheckCircle2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, isLoading } from '../features/studentSlice';

export default function StudentForm({ editStudent, setEditStudent, onViewChange }) {
    const { loading } = useSelector((state) => state.students);
    const [showToast, setShowToast] = useState(true);
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        course: '',
        studentId: '',
        address: '',
        bio: '',
        agreeTerms: false
    });

    useEffect(() => {
        let isEditStuPresent = editStudent ?? {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            dob: '',
            gender: '',
            course: '',
            studentId: '',
            address: '',
            bio: '',
            agreeTerms: false
        }
        if (isEditStuPresent) {
            setFormData(isEditStuPresent);
        }
    }, [editStudent]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(isLoading())
        let newStu = {
            ...formData,
            id: Date.now(),
        }
        setTimeout(() => {
            dispatch(addStudent(newStu))
            dispatch(isLoading())
            alert("Student Data Added Sucessfully")
            onViewChange("List")
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                dob: '',
                gender: '',
                course: '',
                studentId: '',
                address: '',
                bio: '',
                agreeTerms: false
            })
        }, 2000)
        setEditStudent(null)
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* --- SUCCESS TOAST NOTIFICATION --- */}

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">

                {/* Form Header */}
                <div className="bg-gradient-to-r join bg-indigo-600 to-violet-600 p-6 sm:p-8 text-white">
                    {/* <div className="flex items-center gap-3">
                        <GraduationCap className="h-8 w-8 text-indigo-200" />
                        <h2 className="text-2xl font-bold tracking-tight">Student Registration</h2>
                    </div>
                    <p className="text-indigo-100 text-sm mt-2">Please fill out the form below to register the student profile.</p> */}
                    <h2 className="text-2xl font-bold tracking-tight">
                        {editStudent ? "Update Student Profile" : "Student Registration"}
                    </h2>

                    <p className="text-indigo-100 text-sm mt-2">
                        {editStudent
                            ? "Modify the student's information below and save your changes to keep records accurate and up to date."
                            : "Please fill out the form below to register the student profile."}
                    </p>
                </div>


                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">

                    {/* Section: Personal Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Jane"
                                        className="pl-10 w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        className="pl-10 w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="jane.doe@university.edu"
                                        className="pl-10 w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="(555) 000-0000"
                                        className="pl-10 w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                    <input
                                        type="date"
                                        name="dob"
                                        required
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="pl-10 w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all bg-white"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Section: Academic Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Academic Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Student ID / Roll No</label>
                                <div className="relative">
                                    <BookOpen className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                    <input
                                        type="text"
                                        name="studentId"
                                        required
                                        value={formData.studentId}
                                        onChange={handleChange}
                                        placeholder="STU-2026-89"
                                        className="pl-10 w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Enrolled Course</label>
                                <select
                                    name="course"
                                    required
                                    value={formData.course}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all bg-white"
                                >
                                    <option value="">Select a Course</option>
                                    <option value="cs">Computer Science</option>
                                    <option value="se">Software Engineering</option>
                                    <option value="ds">Data Science</option>
                                    <option value="ba">Business Administration</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Section: Contact & Bio */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Additional Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Permanent Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="123 University Ave, Suite 4B"
                                        className="pl-10 w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Short Bio</label>
                                <textarea
                                    name="bio"
                                    rows="3"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    placeholder="Tell us a little about your academic interests..."
                                    className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-start">
                        <div className="flex h-5 items-center">
                            <input
                                id="agreeTerms"
                                name="agreeTerms"
                                type="checkbox"
                                required
                                checked={formData.agreeTerms}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="agreeTerms" className="font-medium text-slate-700">I agree to the institutional privacy policies</label>
                            <p className="text-slate-500">All submitted data will be processed securely according to FERPA guidelines.</p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full relative font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading
                            ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                            : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-100 hover:shadow-xl'
                            }`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Processing Profile...</span>
                            </>
                        ) : (
                            <span>
                                {
                                    !editStudent
                                        ? "Register Student"
                                        : "Modify Student"
                                }

                            </span>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}