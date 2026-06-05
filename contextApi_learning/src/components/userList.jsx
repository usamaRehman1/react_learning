import { useContext } from "react"
import { UserContext } from "../context/userContext"

export const UserList = () => {
    const { users } = useContext(UserContext)

    return (
        <table border={2}>
            <thead>
                <tr>
                    <th>SNo</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, ind) => {
                        return (
                            <tr key={ind}>
                                <td>{ind + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}