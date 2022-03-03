<script>
  import { Link, useNavigate, useLocation } from "svelte-navigator"
  import { user, signup } from '../stores/auth'

  const navigate = useNavigate()
  const location = useLocation()

  let email = ""
  let password = ""
  let submitted = false
  let promise // undefined initially

  const handleSubmit = async () => {
    // TODO email validation
    if(email && email.length > 5 && password) {
      submitted = true
      promise = signup(email, password)
        .then(() => {
          const from = ($location.state && $location.state.from) || "/main"
          navigate(from, { replace: true })
        })
        .catch(() => {
          // if we get an error in the promise we need to re-enable the submit button
          submitted = false
        })
    } else {
      console.log("Please enter a valid email and password.")
    }
  }
  
</script>

<div class="login">
  <h1>Sign up</h1>
  <pre>{ JSON.stringify($user, null, 2) }</pre>
  {#await promise}
    <p>Creating your account...</p>
  {:catch error}
    <p class="errorMessage">{error.message}</p>
  {/await}
  <form on:submit|preventDefault={handleSubmit}>
    <label>
      Email:
      <input type="text" bind:value={email} placeholder="Your email address" />
    </label>
    <label>
      Password:
      <input type="password" bind:value={password} />
    </label>
    
    <button type="submit" disabled='{submitted}'>Sign up</button>
  </form>
  <div>
    Already have an account? <Link to="login">Login here</Link>
  </div>
</div>

<style>
	.login {
		padding: 3rem;
    max-width: 500px;
    margin: 3rem auto 0 auto;
    background: lightblue;
    border-radius: 24px;
	}
</style>