import React, { useState } from 'react'

const ForgetPassword = () => {
    const [Email, setEmail] = useState([])
    const handleChange = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = () => {
        alert("Email sent successfully")
    }
    return (
        <div>
            <h1>Forget Password</h1>
            <input
                type='text'
                placeholder='Email'
                value={Email}
                onChange={handleChange}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default ForgetPassword
