<script>
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';

  export let data;
  export let form;

  let username = '';
  let password = '';
  let isLoading = false;

  // If already authenticated, redirect to admin dashboard
  if (data?.authenticated) {
    goto('/admin/dashboard');
  }
</script>

<div class="bg-surface-50-900-token flex min-h-screen items-center justify-center p-4">
  <div class="card variant-filled-surface w-full max-w-md p-8 shadow-xl">
    <div class="mb-8 text-center">
      <h1 class="mb-2 text-3xl font-bold text-primary-500">Admin Login</h1>
      <p class="text-surface-600-300-token">Access the question management system</p>
    </div>

    {#if form?.error}
      <div class="alert variant-filled-error mb-6">
        <div class="alert-message">
          <p>{form.error}</p>
        </div>
      </div>
    {/if}

    <form
      method="POST"
      action="?/login"
      use:enhance={() => {
        isLoading = true;
        return async ({ result }) => {
          isLoading = false;
          if (result.type === 'redirect') {
            goto('/admin/dashboard');
          }
        };
      }}
    >
      <div class="space-y-6">
        <div>
          <label for="username" class="label">
            <span class="text-sm font-medium">Username</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            bind:value={username}
            required
            class="input variant-form-material w-full"
            placeholder="Enter username"
          />
        </div>

        <div>
          <label for="password" class="label">
            <span class="text-sm font-medium">Password</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            bind:value={password}
            required
            class="input variant-form-material w-full"
            placeholder="Enter password"
          />
        </div>

        <button type="submit" disabled={isLoading} class="variant-filled-primary btn w-full">
          {#if isLoading}
            <span class="mr-2 animate-spin">⏳</span>
            Logging in...
          {:else}
            Login
          {/if}
        </button>
      </div>
    </form>

    <div class="mt-8 text-center">
      <a href="/" class="variant-ghost-surface btn"> ← Back to Home </a>
    </div>
  </div>
</div>
