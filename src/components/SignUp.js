import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = (props) => {

    const [details, setDetails] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })

    let navigate = useNavigate()

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (details.cpassword !== details.password) {
            props.showAlert("Confirm Password and Password should be same", "danger", "3500")
        }

        else {
            const url = "http://localhost:5000/api/auth/createuser"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: details.name,
                    email: details.email,
                    password: details.password
                })
            })
            const json = await response.json()

            if (json.success) {
                // save authToken and redirect to home 
                localStorage.setItem('token', json.authToken)
                navigate('/')
                props.showAlert("Account is created Successfully", "success", "2000")
            }
            else {
                props.showAlert("Account with this Email already exist", "danger", "3000")
            }

            setDetails({
                name: '',
                email: '',
                password: '',
                cpassword: ''
            })
        }

    }

    return (
        <div>
            <h1 className='mt-2'>Create a Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={details.name} aria-describedby="emailHelp" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={details.email} aria-describedby="emailHelp" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={details.password} onChange={handleChange} minLength={8} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' value={details.cpassword} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p className='text-center my-4'>Already have a account? <Link to="/login">Login to Account!</Link> </p>

        </div>
    )
}

export default SignUp
