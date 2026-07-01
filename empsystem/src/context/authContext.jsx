import API_URL from "../utils/api";
import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const UserContext = createContext()

const AuthContext = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const verifyUser = async () => {

            try {

                const token = localStorage.getItem('token')

                if (token) {

                    const response = await axios.get(
    `${API_URL}/api/auth/verify`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                        }
                    )

                    if (response.data.success) {
                        setUser(response.data.user)
                    }

                } else {
                    setUser(null)
                    setLoading(false)   // Fixed: was setloading (lowercase l)
                }

            } catch (error) {
                console.log(error)
                if (error.response && !error.response.data.error) {
                    setUser(null)
                }
            } finally {
                setLoading(false)
            }
        }

        verifyUser()

    }, [])

    const login = (userData) => {
        setUser(userData)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
    }

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(UserContext)
}

export default AuthContext