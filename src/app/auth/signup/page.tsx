'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import { userSignupSchema } from '../../../../schemas'

import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Social from '@/app/components/Social';
import { Card } from '@/components/ui/card';
import Header from '@/app/components/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { registerAction } from '../../../../actions/register-action';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useFormStatus } from 'react-dom';
import Loader from '@/app/components/Loader';

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { pending } = useFormStatus()

  const router = useRouter()

  const form = useForm<z.infer<typeof userSignupSchema>>({
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
    //   full_name: '',
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof userSignupSchema>) => {
    const response = await registerAction(data)
    console.log(response)
    if (response?.success) {
      toast.success('user registered successfully')
      router.push('/auth/signin')
    }else{
      toast.error('user already registered')
    }
    setIsLoading(true)
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className='bg-white rounded-xl shadow-md w-full md:w-[450px] px-7 py-10'>
        <Header label='Sign up' />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="">                                                            
            <FormField
              control={form.control}
              name='full_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="full name"
                      className="w-full rounded border-2 border-gray-300 p-2 text-black focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage  className='text-red-800'/>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="example@gmail.com"
                      className="w-full rounded border-2 border-gray-300 p-2 text-black focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className='text-red-800'/>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="password"
                      className="w-full rounded border-2 border-gray-300 p-2 text-black focus:border-blue-500 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className='text-red-800'/>
                </FormItem>
              )}
            />
             <Button disabled={pending} type='submit' className={`${pending ? 'bg-gray-600': 'bg-black'} w-full mt-5 rounded text-white text-md hover:bg-black/80 px-5 py-3`}>{isLoading ? 'loading...' : 'Sign up'}</Button>
          </form>
        </Form>
        <Social />
        <h1 className='pt-4 w-full text-center'>Already have an account?<Link href={'/auth/signin'} className='text-blue-700 font-semibold'>{pending ? <Loader /> : 'Sign in'}</Link></h1>
      </Card>
    </div>
  )
}

export default page
