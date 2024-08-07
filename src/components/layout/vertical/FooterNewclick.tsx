'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterNewclick = () => {
  // Hooks

  return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <p>
        <span>{`© ${new Date().getFullYear()} - Hecho por `}</span>
        <Link href='https://newclick.cl/' target='_blank' className='text-primary'>
          Newclick
        </Link>
      </p>
    </div>
  )
}

export default FooterNewclick
