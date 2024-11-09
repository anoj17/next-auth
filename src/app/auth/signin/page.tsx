'use client'

import React from 'react'
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import { userLoginSchema } from '../../../../schemas'

import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Social from '@/app/components/Social';
import { Card } from '@/components/ui/card';
import Header from '@/app/components/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { loginUser } from '../../../../actions/register-action';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/Loader';

const page = () => {
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { pending } = useFormStatus()
  const router = useRouter()

  const handleSubmit = async (data: z.infer<typeof userLoginSchema>) => {
    // console.log(data)
    try {
      const response = await loginUser(data)
      console.log(response)
      if (response.success) {
        router.push('/home')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className='bg-white rounded-xl shadow-md md:w-[450px] px-7 py-10'>
        <Header label='Sign in' />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="">
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
                  <FormMessage className='text-red-800' />
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
                  <FormMessage className='text-red-800' />
                </FormItem>
              )}
            />
            <Button disabled={pending} type='submit' className={`${pending ? 'bg-gray-600' : 'bg-black'} w-full mt-5 rounded text-white text-md hover:bg-black/80 px-5 py-3`}>{pending ? <Loader /> : 'Sign in'}</Button>
          </form>
        </Form>
        <Social />
        <h1 className='pt-4 w-full text-center'>Don't have an account?<Link href={'/auth/signup'} className='text-blue-700 font-semibold'>signup</Link></h1>
      </Card>
    </div>
  )
}

export default page
