import { join } from 'path';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in-down': 'fadeInDown 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in-left': 'fadeInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in-right': 'fadeInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'pulse-smooth': 'pulseSmooth 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-smooth': 'bounceSmooth 1s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'float-smooth': 'floatSmooth 3s ease-in-out infinite',
        'rotate-smooth': 'rotateSmooth 2s linear infinite',
        'slide-in-bottom': 'slideInBottom 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in-top': 'slideInTop 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        shimmer: 'shimmer 2s infinite',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInDown: {
          from: {
            opacity: '0',
            transform: 'translateY(-30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInLeft: {
          from: {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        fadeInRight: {
          from: {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        pulseSmooth: {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)',
          },
        },
        bounceSmooth: {
          '0%, 20%, 53%, 80%, 100%': {
            'animation-timing-function': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            transform: 'translateY(0)',
          },
          '40%, 43%': {
            'animation-timing-function': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            transform: 'translateY(-15px)',
          },
          '70%': {
            'animation-timing-function': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            transform: 'translateY(-7px)',
          },
          '90%': {
            transform: 'translateY(-2px)',
          },
        },
        floatSmooth: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        rotateSmooth: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
        slideInBottom: {
          from: {
            opacity: '0',
            transform: 'translateY(100%)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInTop: {
          from: {
            opacity: '0',
            transform: 'translateY(-100%)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        shimmer: {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        gradientShift: {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'smooth-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'smooth-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-in': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'bounce-out': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [
    forms,
    typography,
    skeleton({
      themes: {
        preset: [
          {
            name: 'skeleton',
            enhancements: true,
          },
        ],
      },
    }),
  ],
};
