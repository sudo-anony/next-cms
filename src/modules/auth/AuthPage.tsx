import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Registration } from './components/Registration';
import { ForgotPassword } from './components/ForgotPassword';
import { Login } from './components/Login';
import { toAbsoluteUrl } from '@/theme/helpers';

export function AuthPage() {
  debugger
  const location = useRouter();

  useEffect(() => {
    document.body.classList.add('bg-white');
    return () => {
      document.body.classList.remove('bg-white');
    };
  }, []);

  const renderComponent = () => {
    const { pathname } = location;
    switch (pathname) {
      case '/auth/login':
        return <Login />;
      case '/auth/registration':
        return <Registration />;
      case '/auth/forgot-password':
        return <ForgotPassword />;
      default:
        return <Login />;
    }
  };

  return (
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
      }}
    >
      {/* begin::Content */}
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        {/* begin::Logo */}
        <button type='button' className='mb-12' onClick={() => { }}>
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo-2-dark.svg')} className='h-45px' />
        </button>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
          {renderComponent()}
        </div>
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
      {/* begin::Footer */}
      <div className='d-flex flex-center flex-column-auto p-10'>
        <div className='d-flex align-items-center fw-bold fs-6'>
          <button type='button' className='text-muted text-hover-primary px-2' onClick={() => { }}>
            About
          </button>
          <button type='button' className='text-muted text-hover-primary px-2' onClick={() => { }}>
            Contact
          </button>
          <button type='button' className='text-muted text-hover-primary px-2' onClick={() => { }}>
            Contact Us
          </button>
        </div>
      </div>
      {/* end::Footer */}
    </div>
  );
}
