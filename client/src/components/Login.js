import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useCookies } from 'react-cookie'

const initialFormValues = {
    username: '',
    password: ''
}

const Login = (props) => {
    // const { setLoggedIn } = props

    const [formValues, setFormValues] = useState(initialFormValues)
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([])

    const [cookies, setCookie] = useCookies(['name'])

    const push = useHistory().push

    const fetchUsers = () => {
        axios.get('http://localhost:8000/api/users')
            .then(res => {
                console.log(res)
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const postExistingUser = existingUser => {
        setIsLoading(true)

        axios
            .post('http://localhost:8000/api/auth/login', existingUser)
            // .post('/auth/login', existingUser)
            .then(res => {
                console.log(res)
                sessionStorage.setItem('session', res.data.session)
                sessionStorage.setItem('loggedIn', res.data.session.loggedIn)

                const cookie = res.data.session.cookie
                
                setCookie('cookie',
                { 
                originalMaxAge: cookie.originalMaxAge,
                expires: cookie.expires,
                secure: cookie.secure,
                httpOnly: cookie.httpOnly,
                path: cookie.path
                })
                // setLoggedIn(res.data.session.loggedIn)
                fetchUsers()
                //    push('/')

            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleInputChange = e => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        const existingUser = {
            username: formValues.username,
            password: formValues.password
        }

        postExistingUser(existingUser)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Login:</h2>

                <label>username:
        <input
                        value={formValues.username}
                        onChange={handleInputChange}
                        name='username'
                        type='text'
                        placeholder='username'
                        required
                    />
                </label>

                <label>password:
        <input
                        value={formValues.password}
                        onChange={handleInputChange}
                        name='password'
                        type='password'
                        placeholder='password'
                        required
                    />
                </label>

                <button>Submit</button>

            </form>

            <Link to='/register'>Don't have an accout? Click to register!</Link>

            {users
                &&
                users.map(user => {
                    return (
                        <div key={user.id}>
                            <p>user_id: {user.id}</p>
                            <p>username: {user.username}</p>
                        </div>
                    )
                })  
            }

        </>
    )
}

export default Login