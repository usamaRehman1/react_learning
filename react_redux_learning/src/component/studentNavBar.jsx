import React from 'react';
import { GraduationCap, FileText, List } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Navbar({ currentView, onViewChange }) {
  const { students } = useSelector((state) => state.students)

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Left Side: School Branding */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight hidden xs:block">
              Pinecrest Academy
            </span>
          </div>

          {/* Right Side: Navigation Toggle Pills */}
          <div className="flex items-center gap-1 sm:gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => onViewChange('form')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${currentView === 'form'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Student</span> Form
            </button>

            <button
              onClick={() => onViewChange('list')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${currentView === 'list'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Student</span> List
              {students.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-[10px] sm:text-xs bg-indigo-50 text-indigo-600 rounded-md font-bold">
                  {students.length}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}