import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router';
import UseAuth from '../../hooks/UseAuth';
import SocialLogin from '../sociallogin/SocialLogin';


const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const{creatUser} =UseAuth()

  const onSubmit = (data) => {
    console.log(data);
    creatUser(data.email, data.password)
      
      .then(result => {
      console.log('User registered successfully:', result.user);
      })
      .catch(error => {
      console.error('Error registering user:', error.message);
    })
   
  };

  return (
    <div className="card bg-base-100 w-full max-w-md shadow-2xl">
      <div className="card-body">
        <h1 className="font-bold text-4xl mb-4 text-center">Register Now</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label">Full Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Full Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="label">Photo URL</label>
            <input
              {...register('photoURL', { required: 'Photo URL is required' })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Photo URL"
            />
            {errors.photoURL && (
              <p className="text-red-500 text-sm">{errors.photoURL.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">Password</label>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                },
                validate: {
                  hasCapital: (value) =>
                    /[A-Z]/.test(value) || 'Must include at least one uppercase letter',
                  hasNumber: (value) =>
                    /\d/.test(value) || 'Must include at least one number',
                  hasSpecialChar: (value) =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                    'Must include at least one special character'
                }
              })}
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
            />
            {errors.password && (
              <div className="text-red-500 text-sm">
                <p>{errors.password.message}</p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-neutral w-full">
            Register
          </button>
          <p className="text-sm text-center mt-2">
  Already have an account? <NavLink to="/login" className="text-blue-500 hover:underline">Please login</NavLink>
</p>
        </form>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
