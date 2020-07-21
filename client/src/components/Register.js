import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialFormValues = {
    username: '',
    password: ''
}

const Register =() => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [isLoading, setIsLoading] = useState(false)

    const push = useHistory().push

    const postNewUser = newUser => {
        setIsLoading(true)

        axios
        .post('http://localhost:8000/api/auth/register', newUser)
        .then( res => {
            console.log(res)
            push('/login')
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    const handleInputChange = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        const newUser = {
            username: formValues.username.trim(),
            password: formValues.password.trim()
        }

        postNewUser(newUser)
    }

    return(
        <>
        <form onSubmit= {handleSubmit}>
            <h2>Register:</h2>

        <label>username:
        <input 
        value={formValues.username}
        onChange = {handleInputChange}
        name='username'
        type='text'
        placeholder='username'
        />
        </label>

        <label>password:
        <input 
        value={formValues.password}
        onChange = {handleInputChange}
        name='password'
        type='password'
        placeholder='password'
        />
        </label>

        <button>Submit</button>

        </form>

        <Link to='/login'> Have an accout? Click to login!</Link>

        </>
    )
}

export default Register