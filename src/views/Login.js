import {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {login} from '../Api/auth'
import {authenticate} from '../utils/auth';

import './User.css';
import {Form} from "react-bootstrap";


const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        success: false
    });

    const {email, password, success} = values;

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values})
        login({email, password})
            .then(response => {
                authenticate(response.data.token, () => {
                    setValues({
                        email: '',
                        password: '',
                        success: true,
                    })
                })
            })
            .catch(err => console.log(err))
    }

    const LoginForm = () => (
        <>
            <div className="mx-auto" data-v-791b20d9>
                <div data-v-791b20d9>
                    <section className="flex flex-col md:flex-row items-center md:justify-center py-10 md:py-6" data-v-791b20d9>
                        <div className="bg-white w-full md:w-[450px] px-6 lg:px-8 flex items-start py-12 justify-center relative flex-shrink">
                            <div className="w-full h-full">
                                <h1 className="text-xl md:text-2xl font-bold leading-tight">
                                    Log in to your account
                                </h1>
                                <Form onSubmit={handleSubmit} method="post" class="mt-6">
                                    <div><label className="block text-gray-700">Email Address</label>
                                        <input type="email" name="email" className="form-control" placeholder="Enter Email" value={email} required onChange={handleChange} autofocus="autofocus"
                                               autoComplete={true}
                                               className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-primary-500 focus:bg-white focus:outline-none"/>
                                    </div>

                                    <div className="mt-4"><label className="block text-gray-700">Password</label> <input
                                        type="password" name="password" className="form-control" value={password} required onChange={handleChange} placeholder="Enter Password" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-primary-500
            focus:bg-white focus:outline-none"/></div>

                                    <div className="text-right mt-2"><a href="forgot-password.html"
                                                                        className="text-sm font-semibold text-gray-700 hover:text-primary-700 focus:text-primary-700">Forgot
                                        Password?</a></div>
                                    <button onSubmit={handleSubmit} type="submit" className="w-full block bg-primary-500 hover:bg-primary-400 focus:bg-primary-400 text-white font-semibold rounded-lg
          px-4 py-3 mt-6">
                                        Log In
                                    </button>

                                </Form>
                                <hr className="my-6 border-gray-300 w-full"/>

                                <p className="mt-5 text-center">
                                    Need an account?
                                    <Link to='registration'
                                          class="text-primary-500 hover:text-primary-700 font-semibold">Create an
                                        account</Link>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );

    const showSuccess = () =>
    {
        if (success) return (
            <Redirect to='/admin'/>
        )
    }

    return (
        <div>
            {showSuccess()}
            {LoginForm()}
        </div>
    );
}

export default Login;