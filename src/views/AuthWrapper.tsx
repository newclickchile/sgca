'use client'

import type { ReactNode } from 'react'

import Link from 'next/link'

import Typography from '@mui/material/Typography'
import { Card, CardContent } from '@mui/material'

import Illustrations from '@components/Illustrations'
import Logo from '@components/layout/shared/Logo'

import { useImageVariant } from '@core/hooks/useImageVariant'

const AuthWrapper = ({
  children,
  title,
  subtitle,
  urlBack
}: {
  children: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  urlBack?: string
}) => {
  const darkImg = '/images/pages/auth-v2-mask-dark.png'
  const lightImg = '/images/pages/auth-v2-mask-light.png'

  const authBackground = useImageVariant('light', lightImg, darkImg)

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          <Link href={'/'} className='flex justify-center items-center mbe-6'>
            <Logo />
          </Link>
          <div className='flex flex-col gap-5'>
            <div>
              <Typography variant='h4'>{title}</Typography>
              <Typography className='mbs-2'>{subtitle}</Typography>
            </div>
            {children}
            {urlBack && (
              <Typography textAlign={'center'} color='primary' component={Link} href={urlBack}>
                Volver
              </Typography>
            )}
          </div>
        </CardContent>
      </Card>
      <Illustrations image1='' image2='' maskImg={{ src: authBackground }} />
    </div>
  )
}

export default AuthWrapper
