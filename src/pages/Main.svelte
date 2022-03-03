<script>
  import { user } from '../stores/auth'
</script>
<main>
  <h2>You are logged in ...</h2>
  <pre>
    {JSON.stringify($user, null, 2)}
  </pre>
</main>