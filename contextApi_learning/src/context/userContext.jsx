import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [users, setUsers] = useState([
        {
            name: "usama",
            email: "usama@mail.com"
        },
        {
            name: "yasir",
            email: "yasir@mail.com"
        },
    ])

    const addUser = (user) => {
        setUsers([user, ...users])
    }

    return (
        <UserContext.Provider value={{
            users,
            addUser
        }}>
            {children}
        </UserContext.Provider>
    )
}