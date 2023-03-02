import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col, Form, FormGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.config'
import { toast } from 'react-toastify'

import '../styles/login.css'


function Login() {

  const navigate = useNavigate()
  const goToSignup = () => {
    navigate('/signup')
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const signIn = async (e) => {

    e.prevenDefault()
    setLoading(true)

    try {

      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      const user = userCredential.user

      console.log(user)
      setLoading(false)
      toast.success('Successfully logged in')
      navigate('/checkout')

    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <Helmet title='Login'>
      <section>
        <Container>
          <Row>
            {
              loading ? <Col lg='12' className='text-center'><h5>Loading .....</h5></Col>
              : 
              <Col lg='6' className='m-auto text-center'>
                <h3 className='fw-bold mb-4'>Login</h3>

                <Form className='auth__form' onSubmit={signIn}>
                  <FormGroup className='form__group'>
                    <input
                      type='email' 
                      placeholder='Enter your email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </FormGroup>

                  <FormGroup className='form__group'>
                    <input 
                      type='password'
                      placeholder='Enter your password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </FormGroup>

                  <button type='submit'className="auth__btn">Login</button>
                  <p onClick={goToSignup}>Don't have an account?
                    <span> Create an account</span>
                  </p>
                </Form>
            </Col>
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Login