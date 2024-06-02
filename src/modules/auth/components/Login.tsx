/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as auth from '../redux/AuthRedux';
import { login } from '../redux/AuthCRUD';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import Link from 'next/link';

const responseMessage = (response: CredentialResponse) => {
  console.log(response);
};

const errorMessage = () => {
  console.error('Google login failed');
};

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(7, 'Minimum 7 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
});

const initialValues = {
  email: 'admin@demo.com',
  password: 'demo',
};

export function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      const formData = new FormData();
      formData.append('user[email]', values.email);
      formData.append('user[password]', values.password);
      setLoading(true);
      setTimeout(() => {
        login(formData)
          .then(({ data }) => {
            const accessToken = data.data.token;
            setLoading(false);
            dispatch(auth.actions.login(accessToken));
            router.push('/dashboard');
          })
          .catch(() => {
            setLoading(false);
            setSubmitting(false);
            setStatus('The login detail is incorrect');
          });
      }, 50);
    },
  });

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Sign In to Metronic</h1>
        <div className='text-gray-400 fw-bold fs-4'>
          New Here?
          <Link href='/auth/registration' passHref>
            <span className='link-primary fw-bolder'>Create an Account</span>
          </Link>
        </div>
      </div>
      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>
            Use account <strong>admin@demo.com</strong> and password <strong>demo</strong> to continue.
          </div>
        </div>
      )}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.email && formik.errors.email },
            { 'is-valid': formik.touched.email && !formik.errors.email }
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.email}</span>
          </div>
        )}
      </div>
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
            <Link href='/auth/forgot-password' prefetch={true}>
              <span className='link-primary fs-6 fw-bolder' style={{ marginLeft: '5px' }}>
                Forgot Password?
              </span>
            </Link>
          </div>
        </div>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.password && formik.errors.password },
            { 'is-valid': formik.touched.password && !formik.errors.password }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <div className='text-center text-muted text-uppercase fw-bolder mb-5'>or</div>
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
    </form>
  );
}
