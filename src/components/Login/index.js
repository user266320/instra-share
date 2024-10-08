import React, {useState} from 'react'
import Cookies from 'js-cookie'
import {useHistory} from 'react-router-dom'
import './index.css'
import {async} from 'rxjs'

const Login = () => {
  const [username, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const history = useHistory()
  const isSucess = token => {
    Cookies.set('jwt_token', token, {expires: 30, path: '/'})
    history.replace('/')
  }
  const isFailure = msg => {
    setPasswordError(msg)
  }
  const formHandling = async event => {
    event.preventDefault()

    setEmailError('')
    setPasswordError('')

    if (!username) {
      setEmailError('Please provide a username')
    }

    if (!password) {
      setPasswordError('Please provide a password')
    }

    if (username && password) {
      const userDetails = {username, password}
      console.log('userDetails', userDetails)
      const url = 'https://apis.ccbp.in/login'
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }

      try {
        const response = await fetch(url, options)

        if (response.ok) {
          const token = await response.json()
          isSucess(token.jwt_token)
        } else {
          const errorData = await response.json()
          console.log('no---------', errorData)
          isFailure(errorData.error_msg)
        }
      } catch (error) {
        console.error('Failed to fetch:', error)
      }
    }
  }

  return (
    <div className="login-main-container">
      <div className="login-left-container">
        <img
          src={`${process.env.PUBLIC_URL}/img/instra-login.png`}
          alt="logo-img"
        />
      </div>
      <div className="login-right-container">
        <div className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="logo" />
        </div>
        <h1>Insta Share</h1>
        <div>
          <form className="form-container" onSubmit={formHandling}>
            <div className="email-container">
              <label className="label-inputs" htmlFor="email">
                USERNAME / EMAIL
              </label>
              <input
                type="text"
                id="email"
                autoComplete="username"
                value={username}
                onChange={event => setEmail(event.target.value)}
              />
              {emailError && <div className="error-div">{emailError}</div>}
            </div>
            <div className="password-container">
              <label className="label-inputs" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
              {passwordError && (
                <div className="error-div">{passwordError}</div>
              )}
            </div>
            <div className="submit-container">
              <input type="submit" id="button" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
