import { writable } from 'svelte/store'

export const user = writable(null)

export const logout = () => user.set(null)

export const login = async (email, password) => {
  const baseUrl = "MYURL"
  try {
    const response = await fetch(`${baseUrl}/login`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    const data = await response.json()
    if(data?.success && data?.user) {
      // we have a logged in user
      user.set(data.user) 
    } else {
      // we weren't successful
      user.set(null)
      throw new Error("There was an error logging you in. Please check the email and password before trying again.")
    }
  } catch (e) {
    console.log('There was a login error: ', e)
    user.set(null)
    throw new Error("There was an error logging you in. Please check the email and password before trying again.")
  }
}

export const signup = async (email, password) => {
  const baseUrl = "MYURL"
  try {
    const response = await fetch(`${baseUrl}/signup`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    const data = await response.json()
    if(data?.success && data?.user) {
      // we have a logged in user
      user.set(data.user) 
    } else {
      // we weren't successful
      user.set(null)
      throw new Error("There was an error signing you up, please refresh the page and try again.")
    }
  } catch (e) {
    console.log('There was a sign up error: ', e)
    user.set(null)
    throw new Error("There was an error signing you up, please refresh the page and try again.")
  }
}