import React, { useEffect, useRef } from 'react'
import {
  ScrollTopComponent,
  DrawerComponent,
  ToggleComponent,
  StickyComponent,
} from '../../assets/ts/components'
import { KTSVG } from '../../helpers'
import { useRouter } from 'next/router'

export function ScrollTop() {
  const { pathname } = useRouter()
  const isFirstRun = useRef(true)

  const pluginsReinitialization = () => {
    setTimeout(() => {
      StickyComponent.reInitialization()
      setTimeout(() => {
        ToggleComponent.reinitialization()
        DrawerComponent.reinitialization()
      }, 70)
    }, 140)
  }

  const scrollTop = () => {
    if (typeof ScrollTopComponent !== 'undefined' && ScrollTopComponent !== null) {
      ScrollTopComponent.goTop()
    }
  }

  const updateHeaderSticky = () => {
    const stickyHeader = document.body.querySelectorAll(`[data-kt-sticky-name="header"]`)
    if (stickyHeader && stickyHeader.length > 0) {
      const sticky = StickyComponent.getInstance(stickyHeader[0] as HTMLElement)
      if (sticky) {
        sticky.update()
      }
    }
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
    } else {
      pluginsReinitialization()
    }

    updateHeaderSticky()
  }, [pathname])

  useEffect(() => {
    // Call scrollTop after the component is mounted
    scrollTop()
  }, [])

  return (
    <div id='kt_scrolltop' className='scrolltop' data-kt-scrolltop='true'>
      <KTSVG path='/media/icons/duotune/arrows/arr066.svg' />
    </div>
  )
}
