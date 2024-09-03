import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [details, setDetails] = useState({
        email: "",
        password: ""
    })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = "http://localhost:5000/api/auth/login"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: details.email,
                password: details.password
            })
        })
        const json = await response.json()

        if (json.success) {
            // save authToken and redirect to home 
            localStorage.setItem('token', json.authToken)
            navigate('/')
            props.showAlert("Login Successfully", "success", "2000")
        }
        else {
            props.showAlert("Details are incorrect", "danger", "3000")
        }

        setDetails({
            email: '',
            password: ''
        })
    }

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h1 className='mt-2'>Login to your account</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={details.email} onChange={handleChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={details.password} onChange={handleChange} name='password' />
                </div>
                <button disabled={details.password.length < 8} type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p className='text-center my-4'>Don't have a account? <Link to="/signup">Create Account!</Link> </p>
        </div>
    )
}

export default Login
