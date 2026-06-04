import React, { useState } from 'react';
import Navbar from '../component/studentNavBar';
import StudentForm from '../component/studentForm';
import StudentList from '../component/studentsList';

export default function App() {
  const [view, setView] = useState('form'); // 'form' or 'list'
  const [editStudent, setEditStudent] = useState(null)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation passing the view state and handler */}
      <Navbar
        currentView={view}
        onViewChange={setView}
        totalStudents={10}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {view === 'form' ? (
          <StudentForm editStudent={editStudent} setEditStudent={setEditStudent} onViewChange={setView} redirectToList={() => setView('list')} />
        ) : (
          <StudentList etEditStudent={setEditStudent} onViewChange={setView} />
        )}
      </main>
    </div>
  );
}