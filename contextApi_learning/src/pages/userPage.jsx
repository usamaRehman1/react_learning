import { UserForm } from "../components/userForm"
import { UserList } from "../components/userList"

export const UserPage = () => {
    return (
        <>
            <h1>User Data Entry Form</h1>
            <UserForm />
            <h1>User Data</h1>
            <UserList />
        </>
    )
}