import { redirect, fail } from '@sveltejs/kit';

export async function load({ cookies }) {
  const adminSession = cookies.get('admin-session');

  if (adminSession === 'authenticated') {
    throw redirect(302, '/admin/dashboard');
  }

  return {
    authenticated: false,
  };
}

export const actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    // Simple hardcoded credentials (in production, use proper authentication)
    if (username === 'admin' && password === 'admin') {
      // Set session cookie
      cookies.set('admin-session', 'authenticated', {
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
        sameSite: 'strict',
      });

      throw redirect(302, '/admin/dashboard');
    }

    return fail(400, {
      error: 'Invalid username or password',
    });
  },
};
