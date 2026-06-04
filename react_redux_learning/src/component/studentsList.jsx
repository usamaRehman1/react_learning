import React, { useState } from 'react';
import { Search, MapPin, Mail, Phone, GraduationCap, Users, Calendar, Edit2, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStudent } from '../features/studentSlice';

export default function StudentList({ etEditStudent, onViewChange }) {
  const [searchTerm, setSearchTerm] = useState('');

  const students = useSelector((state) => state.students.students)

  const dispatch = useDispatch()

  // Filter logic based on Name, Email, or Course
  const filteredStudents = students.filter(student => {
    const searchString = searchTerm.toLowerCase();
    return (
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchString) ||
      student.email?.toLowerCase().includes(searchString) ||
      student.course?.toLowerCase().includes(searchString) ||
      student.studentId?.toLowerCase().includes(searchString)
    );
  });

  // Action Handlers placeholders (Implement your Redux / State logic here)
  const handleEdit = (student) => {
    dispatch(deleteStudent(student.id))
    etEditStudent(student)
    onViewChange("form")
    console.log("Edit student:", student);
  };

  const handleDelete = (id) => {
    dispatch(deleteStudent(id))
  };

  return (
    <div className="w-full space-y-6 font-sans">

      {/* --- QUICK STATISTICS DASHBOARD --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Enrolled</p>
            <h4 className="text-2xl font-bold text-slate-800">{students.length}</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Active Courses</p>
            <h4 className="text-2xl font-bold text-slate-800">
              {new Set(students.map(s => s.course).filter(Boolean)).size}
            </h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Academic Year</p>
            <h4 className="text-2xl font-bold text-slate-800">2026</h4>
          </div>
        </div>
      </div>

      {/* --- CORE WRAPPER --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

        {/* Table Controls */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Student Directory</h2>
            <p className="text-slate-500 text-sm">Manage and review all registered active student profiles.</p>
          </div>

          {/* Live Search Input Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, ID, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 text-slate-700"
            />
          </div>
        </div>

        {/* --- DESKTOP TABLE VIEW (Visible on tablet up) --- */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 uppercase text-xs font-semibold tracking-wider border-b border-slate-100">
                <th className="py-4 px-6">Student ID</th>
                <th className="py-4 px-6">Full Name</th>
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6">Enrolled Course</th>
                <th className="py-4 px-6">Contact Number</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {filteredStudents.map((student, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="font-mono text-xs font-semibold tracking-wide text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                      {student.studentId || `STU-${1000 + idx}`}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-900 whitespace-nowrap group-hover:text-indigo-600 transition-colors">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-slate-500">{student.email}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200/50">
                      {student.course || 'Unassigned'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 whitespace-nowrap">{student.phone || 'N/A'}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-right text-xs font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-slate-400 hover:text-indigo-600 p-1.5 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit Profile"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(student.id || `STU-${1000 + idx}`)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Profile"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- MOBILE CARDS LAYOUT (Visible on smaller screens) --- */}
        <div className="block md:hidden divide-y divide-slate-100">
          {filteredStudents.map((student, idx) => (
            <div key={idx} className="p-5 space-y-3.5 hover:bg-slate-50/40 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900">{student.firstName} {student.lastName}</h4>
                  <span className="inline-block mt-1 font-mono text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {student.studentId || `STU-${1000 + idx}`}
                  </span>
                </div>
                <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 font-medium rounded-full">
                  {student.course}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>{student.email}</span>
                </div>
                {student.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    <span>{student.phone}</span>
                  </div>
                )}
                {student.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span className="truncate max-w-[250px]">{student.address}</span>
                  </div>
                )}
              </div>

              {/* Mobile Action Controls */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => handleEdit(student)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-slate-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(student.studentId || `STU-${1000 + idx}`)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 bg-rose-50/40 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* --- EMPTY STATE HANDLER --- */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="text-slate-700 font-medium text-sm">No match records found</h3>
            <p className="text-slate-400 text-xs mt-1 max-w-xs mx-auto">
              {students.length === 0
                ? "The structural registry is empty. Switch back to the Student Form to populate profiles."
                : "Try adjusting your search keywords to locate specific parameters."}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}