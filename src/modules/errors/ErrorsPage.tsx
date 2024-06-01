import React from 'react'
import { Error500 } from './components/Error500'
import { Error404 } from './components/Error404'
import { toAbsoluteUrl } from '../../../theme/helpers'

const ErrorsPage: React.FC = () => {
  const handleRedirectToDashboard = () => {
    window.location.href = '/'
  }

  // Determine the error type based on the URL path
  const path = window.location.pathname
  let errorComponent = <Error404 />
  if (path === '/error/500') {
    errorComponent = <Error500 />
  }

  return (
    <div className='d-flex flex-column flex-root'>
      <div
        className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
        style={{ backgroundImage: `url('${toAbsoluteUrl('/media/illustrations/progress-hd.png')}')` }}
      >
        <div className='d-flex flex-column flex-column-fluid text-center p-10 py-lg-20'>
          <a href='/dashboard' className='mb-10 pt-lg-20'>
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/logos/logo-1.svg')}
              className='h-50px mb-5'
            />
          </a>
          <div className='pt-lg-10 mb-10'>
            {errorComponent}
            <div className='text-center'>
              <button onClick={handleRedirectToDashboard} className='btn btn-lg btn-primary fw-bolder'>
                Go to homepage
              </button>
            </div>
          </div>
          <div
            className='
          d-flex
          flex-row-auto
          bgi-no-repeat
          bgi-position-x-center
          bgi-size-contain
          bgi-position-y-bottom
          min-h-100px min-h-lg-350px
        '
            style={{
              backgroundImage: `url('${toAbsoluteUrl('/media/illustrations/sketchy-1/17.png')}')`,
            }}
          ></div>
        </div>

        <div className='d-flex flex-center flex-column-auto p-10'>
          <div className='d-flex align-items-center fw-bold fs-6'>
            <a href='https://keenthemes.com' className='text-muted text-hover-primary px-2'>
              About
            </a>
            <a href='mailto:support@keenthemes.com' className='text-muted text-hover-primary px-2'>
              Contact
            </a>
            <a href='https://1.envato.market/EA4JP' className='text-muted text-hover-primary px-2'>
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ErrorsPage }
