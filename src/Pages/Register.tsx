import React, { useState } from 'react'
import { SD_Roles } from '../Utility/StaticDetail'
import { inputHelper } from '../Helper';
import { useRegisterUserMutation } from '../API/authAPI';
import { apiResponse } from '../Interfaces';
import { toastNotify } from '../Helper';
import { useNavigate } from 'react-router-dom';
import { MainLoader } from '../Components/Page/Common';

function Register() {
    const navigate = useNavigate()
    const [registerUser] = useRegisterUserMutation();
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState({
        userName: "",
        password: "",
        name: "",
        role: ""
    })

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const tempData = inputHelper(e, userInput)
        setUserInput(tempData)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const response: apiResponse = await registerUser({
            userName: userInput.userName,
            password: userInput.password,
            name: userInput.name,
            role: userInput.role
        })

        if (response.data) {
            toastNotify("Registeration Successful");
            navigate("/login")
        }
        else if (response.error != null)
        {
            toastNotify(response.error.data.errorMessages[0], "error");   
        }

        setLoading(false)
    }

    return (
        <div className="container text-center">
            <form method="post" onSubmit={handleSubmit}>
                <h1 className="mt-5">Register</h1>
                <div className="mt-5">
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Username"
                            required
                            value={userInput.userName}
                            onChange={handleUserInput}
                            name="userName"
                        />
                    </div>
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            required
                            value={userInput.name}
                            onChange={handleUserInput}
                            name="name"
                        />
                    </div>
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            required
                            value={userInput.password}
                            onChange={handleUserInput}
                            name="password"
                        />
                    </div>
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <select className="form-control form-select" required value={userInput.role}
                            onChange={handleUserInput} name="role">
                            <option value="">--Select Role--</option>
                            <option value={`${SD_Roles.CUSTOMER}`}>Customer</option>
                            <option value={`${SD_Roles.ADMIN}`}>Admin</option>
                        </select>
                    </div>
                </div>
                {loading && <MainLoader />}
                <div className="mt-5">
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register