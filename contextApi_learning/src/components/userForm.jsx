import { useContext, useState } from "react"
import { UserContext } from "../context/userContext"

export const UserForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const { addUser } = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser({ name, email })
        setName("")
        setEmail("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="enter name" onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="example@mail.com" onChange={(e) => setEmail(e.target.value)} />
            <input type="submit" value="ADD" />
        </form>
    )
}