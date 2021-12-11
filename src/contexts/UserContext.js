import React, { useContext, useState } from "react"

const UserContext = React.createContext()
const UserUpdateContext = React.createContext()

export function useUser() {
    return useContext(UserContext)
}

export function useUserUpdate() {
    return useContext(UserUpdateContext)
}

export function UserProvider({ children }) {

    const [login, setLogin] = useState(false)

    function changeLoginState() {
        setLogin(login => !login)
    }

    return (
        <UserContext.Provider value={login}>
            <UserUpdateContext.Provider value={changeLoginState()}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    )

}