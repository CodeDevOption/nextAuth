import Layout from '@/layout/layout'
import React, { useState } from 'react'
import styles from '../styles/Form.module.css'
import {HiAtSymbol, HiFingerPrint, HiOutlineUser} from 'react-icons/hi'
import Link from 'next/link'
import { useFormik } from 'formik'
import { register_validate } from '@/lib/validate'
import { useRouter } from 'next/router'

const Register = () => {

  const [active, setActive] = useState({password:false,cpassword:false});
   const router = useRouter();
  const onSubmit = async (values)=>{
    const options={
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(values),
    }
    fetch('http://localhost:3000/api/auth/signup',options).then(res => res.json()).then((data) =>{
      formik.resetForm();
      if(data) router.push('/login');

    })
    
  }

  const formik = useFormik({
    initialValues:{
      username:'',
      email:'',
      password:'',
      cpassword:''
    },
    validate:register_validate,
    onSubmit
  });

  return (
    <Layout><section className="w-3/4 mx-auto flex flex-col gap-5">
    {/* Header section */}
    <div className="title mb-1">
        <h1 className='text-lg'>Register</h1>
        <p className='w-3/4 mx-auto text-gray-400 text-xs'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, quia.</p>
    </div>
    {/* form Section */}
    <form className='flex flex-col gap-3' onSubmit={formik.handleSubmit}>
        <div className={`${formik.errors.username && formik.touched.username && 'border-red-400'} ${styles.input_group}`}>
          <input 
          type="text"
          name='username'
          placeholder='Username' 
          className={styles.input_text}
          {...formik.getFieldProps('username')}
           />
           <span className='icon flex items-center px-3 absolute right-0 top-0 bottom-0'><HiOutlineUser /></span>
        </div>

        {/* <span className='text-xs text-red-500 -mt-3 mb-0 text-left ml-3'>{formik.errors.username && formik.touched.username && formik.errors.username}</span> */}
       
        <div className={`${formik.errors.email && formik.touched.email && 'border-red-400'} ${styles.input_group}`}>
          <input 
          type="email"
          name='email'
          placeholder='Email' 
          className={styles.input_text}
          {...formik.getFieldProps('email')}
           />
           <span className='icon flex items-center px-3 absolute right-0 top-0 bottom-0'><HiAtSymbol /></span>
        </div>

        {/* <span className='text-xs text-red-500 -mt-3 mb-0 text-left ml-3'>{formik.errors.email && formik.touched.email && formik.errors.email}</span> */}

        <div className={`${formik.errors.password && formik.touched.password && 'border-red-400'} ${styles.input_group}`}>
          <input 
          type={active.password ? 'text' : 'password'}
          name='password'
          placeholder='password' 
          className={styles.input_text}
          {...formik.getFieldProps('password')}
           />
           <span onClick={() => setActive((cr)=> ({...cr,password:!cr.password}))} className={`icon flex items-center px-3 absolute right-0 top-0 bottom-0 ${active.password && styles.activeShow}`}><HiFingerPrint /></span>

        </div>

        {/* <span className='text-xs text-red-500 -mt-3 mb-0 text-left ml-3'>{formik.errors.password && formik.touched.password && formik.errors.password}</span> */}


        <div className={`${formik.errors.cpassword && formik.touched.cpassword && 'border-red-400'} ${styles.input_group}`}>
          <input 
          type={active.cpassword ? 'text' : 'password'}
          name='cpassword'
          placeholder='confirm password' 
          className={styles.input_text}
          {...formik.getFieldProps('cpassword')}
           />
           <span onClick={() => setActive((cr)=> ({...cr,cpassword:!cr.cpassword}))} className={`icon flex items-center px-3 absolute right-0 top-0 bottom-0 ${active.cpassword && styles.activeShow}`}><HiFingerPrint /></span>

        </div>
        {/* <span className='text-xs text-red-500 -mt-3 mb-0 text-left ml-3'>{formik.errors.cpassword && formik.touched.cpassword && formik.errors.cpassword}</span> */}

        {/* login Btns */}
        <div className='input-btn'>
          <button type='submit' className={styles.button}>Create</button>
        </div>
    </form>
    {/* Bottom Section */}
    <p className='text-center text-sm text-gray-400 '>
      Already have an account yet? <Link href={'/login'} className='text-blue-700'>Login</Link>
    </p>
</section></Layout>
  )
}

export default Register