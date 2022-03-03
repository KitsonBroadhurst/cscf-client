<script>
	import { Router, Route, Link } from "svelte-navigator"
	import PrivateRoute from './components/PrivateRoute.svelte'
	import Login from './pages/Login.svelte'
	import SignUp from './pages/SignUp.svelte'
	import Main from './pages/Main.svelte'
	import { user, logout } from './stores/auth'
</script>

<Router>
	<header>
		<nav>
			<Link to="/">Home</Link>
			{#if $user}
				<Link to="main">Dashboard</Link>
				<button type="button" on:click={logout}>Log Out</button>
			{:else}
				<Link to="login">Login</Link>
			{/if}
		</nav>
	</header>

	<main>
		<Route path="login">
      <Login />
    </Route>
		<Route path="signup">
      <SignUp />
    </Route>
		<Route path="/">
      <h3>Landing page</h3>
      <p>Home sweet home...</p>
    </Route>
		<PrivateRoute path="main" let:location>
      <Main />
    </PrivateRoute>
	</main>
</Router>
