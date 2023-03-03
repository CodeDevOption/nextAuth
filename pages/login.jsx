import Layout from '@/layout/layout'
import Link from 'next/link'
import React, { useState } from 'react'
import styles from '../styles/Form.module.css'
import Image from 'next/image'
import {HiAtSymbol, HiFingerPrint} from 'react-icons/hi'
import {signIn} from 'next-auth/react';
import { useFormik } from 'formik'
import {login_validate} from '@/lib/validate'
import { useRouter } from 'next/router'


const Login = () => {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const onSubmit = async (values)=>{
  const status =  await signIn('credentials',{
      redirect:false,
      email:values.email,
      password:values.password,
      callbackUrl:'/'
    })
    if(status.ok) router.push(status.url)
  }

  
  
  const formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validate:login_validate,
    onSubmit
    
  });

  const handleGoogleSignIn = async ()=>{
    signIn('google',{callbackUrl:'http://localhost:3000'});
  }
  const handleGithubSignIn = async ()=>{
    signIn('github',{callbackUrl:'http://localhost:3000'});
  }

  return (
    <Layout>
        <section className="w-3/4 mx-auto flex flex-col gap-5">
            {/* Header section */}
            <div className="title mb-1">
                <h1 className='text-lg'>Explore</h1>
                <p className='w-3/4 mx-auto text-gray-400 text-xs'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, quia.</p>
            </div>
            {/* form Section */}
            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-3'>
                <div className={styles.input_group}>
                  <input 
                  type="email"
                  name='email'
                  placeholder='Email' 
                  {...formik.getFieldProps('email')}
                  className={styles.input_text}
                   />
                   <span className='icon flex items-center px-3 absolute right-0 top-0 bottom-0'><HiAtSymbol /></span>
                </div>

                <span className='text-xs text-red-500 -mt-3 mb-0 text-left ml-3'>{formik.errors.email && formik.touched.email && formik.errors.email}</span>


                <div className={styles.input_group}>
                  <input 
                  type={active ? 'text' : 'password'}
                  name='password'
                  placeholder='password' 
                  className={styles.input_text}
                  {...formik.getFieldProps('password')}
                   />
                   <span onClick={() => setActive((cr)=> !cr)} className={`icon flex items-center px-3 absolute right-0 top-0 bottom-0 ${active && styles.activeShow}`}><HiFingerPrint /></span>

                </div>
                <span className='text-xs text-red-500 -mt-3 mb-0 text-left ml-3'>{formik.errors.password && formik.touched.password && formik.errors.password}</span>
                {/* login Btns */}
                <div className='input-btn'>
                  <button type='submit'  className={styles.button}>Login</button>
                </div>
                <div className="input-btn">
                  
                  <button  onClick={handleGoogleSignIn} className={styles.button_custom} type='button'>Sign In with Google <Image src='/assets/google.svg' alt='google-icon' width={20} height={20} /></button>
                </div>
                <div className="input-btn">
                  <button onClick={handleGithubSignIn} className={styles.button_custom} type='button'>Sign In with Github <Image src='/assets/github.svg' width={25} height={25} alt='github-icon' /></button>
                </div>
            </form>
            {/* Bottom Section */}
            <p className='text-center text-sm text-gray-400 '>
              don't have an account yet? <Link href={'/register'} className='text-blue-700'>Register</Link>
            </p>
        </section>
    </Layout>
  )
}

export default Login