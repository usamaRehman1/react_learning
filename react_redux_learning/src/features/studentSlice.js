import { createSlice } from '@reduxjs/toolkit'

const initialStudentState = {
    students: [
        {
            studentId: "STU-2026-001",
            firstName: "Jane",
            lastName: "Doe",
            email: "jane.doe@pinecrest.edu",
            phone: "(555) 234-5678",
            dob: "2004-05-14",
            gender: "female",
            course: "Computer Science",
            address: "742 Evergreen Terrace, Springfield",
            bio: "Aspiring software engineer specializing in frontend interface architectures.",
            agreeTerms: true
        },
        {
            studentId: "STU-2026-002",
            firstName: "Liam",
            lastName: "Chen",
            email: "l.chen@pinecrest.edu",
            phone: "(555) 876-5432",
            dob: "2003-11-22",
            gender: "male",
            course: "Data Science",
            address: "123 Innovation Way, Apt 4B, Tech City",
            bio: "Passionate about machine learning and predictive data modeling statistics.",
            agreeTerms: true
        },
        {
            studentId: "STU-2026-003",
            firstName: "Aaliyah",
            lastName: "Jackson",
            email: "aaliyah.j@pinecrest.edu",
            phone: "(555) 456-7890",
            dob: "2005-02-01",
            gender: "female",
            course: "Software Engineering",
            address: "89 University Avenue, Campus Dorms",
            bio: "Full stack developer enthusiast. Love hackathons and building accessible UI components.",
            agreeTerms: true
        },
        {
            studentId: "STU-2026-004",
            firstName: "Marcus",
            lastName: "Vance",
            email: "m.vance@pinecrest.edu",
            phone: "", // Testing empty string fallback
            dob: "2004-08-19",
            gender: "male",
            course: "Computer Science",
            address: "", // Testing missing optional address layout
            bio: "Systems optimization enthusiast looking into kernel architectures.",
            agreeTerms: true
        },
        {
            studentId: "STU-2026-005",
            firstName: "Elena",
            lastName: "Rostova",
            email: "elena.r@pinecrest.edu",
            phone: "(555) 901-2345",
            dob: "2003-03-30",
            gender: "other",
            course: "Data Science",
            address: "456 Oak Ridge Road, East District",
            bio: "Bridging the gap between corporate operations strategies and structural data insights.",
            agreeTerms: true
        }
    ],
    loading: false,
    error: null,
};

const studentSlice = createSlice({
    name: "students",
    initialState: initialStudentState,
    reducers: {
        isLoading: (state) => {
            state.loading = !state.loading
        },
        addStudent: (state, action) => {
            state.students = [action.payload, ...state.students]
        },
        deleteStudent: (state, action) => {
            state.students = state.students.filter((student) => student.id !== action.payload)
        },
    }
})

export const { isLoading, addStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer