import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ cookies }) => {
    cookies.delete('admin-session', { path: '/' });
    throw redirect(302, '/admin');
  }
};