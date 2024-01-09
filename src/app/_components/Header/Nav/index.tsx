'use client'

import React from 'react'
import Link from 'next/link'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { Button } from '../../Button'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'

import classes from './index.module.scss'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  // Extracting navItems and user from props and context
  const navItems = header?.navItems || []
  const { user } = useAuth()

  return (
    // Applying conditional styling based on the user's login status
    <nav className={[classes.nav, user === undefined && classes.hide].filter(Boolean).join(' ')}>
      {/* Rendering CMSLinks based on navItems */}
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="none" />
      })}

      {/* Always rendering a single CartLink */}
      <CartLink />

      {/* Conditional rendering based on user's login status */}
      {user ? (
        // Rendering Account link if user is logged in
        <Link href="/account">Account</Link>
      ) : (
        // Rendering Login button if user is not logged in
        <Button
          el="link"
          href="/login"
          label="Login"
          appearance="primary"
          onClick={() => (window.location.href = '/login')}
        />
      )}
    </nav>
  )
}
