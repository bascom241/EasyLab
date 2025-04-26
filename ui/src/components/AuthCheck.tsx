"use client"
import React from 'react'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
const AuthCheck = () => {

    const { checkAuth } = useAuthStore();

    useEffect(()=>{
      checkAuth()
    }, [checkAuth])

  return null

}

export default AuthCheck
