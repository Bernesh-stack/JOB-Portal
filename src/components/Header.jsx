import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react'
const Header = () => {
  return (
    <nav className='py-4 flex justify-between items-center'>
        <Link >
        <img src='/Logo.png' alt='logo' className='h-20'/>
        </Link>

        <Button variant="outline">  Login  </Button>

      {/* <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn> */}


    </nav>
  )
}

export default Header