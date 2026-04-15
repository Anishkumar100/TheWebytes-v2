/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* shadcn semantic tokens (HSL) */
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        /* TheWebytes brand (immutable) */
        brand: {
          cyan:  '#33D6E5',
          blue:  '#4F7BB8',
          teal:  '#1D9FB4',
          ice:   '#8DF0FA',
          space: '#1C1825',
        },

        /* TheWebytes semantic theme tokens (auto light/dark) */
        surface: {
          DEFAULT:  'var(--surface)',
          base:     'var(--surface-base)',
          alt:      'var(--surface-alt)',
          elevated: 'var(--surface-elevated)',
          sunken:   'var(--surface-sunken)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          strong:  'var(--ink-strong)',
          muted:   'var(--ink-muted)',
          soft:    'var(--ink-soft)',
          faint:   'var(--ink-faint)',
          inverse: 'var(--ink-inverse)',
        },
        line: {
          DEFAULT: 'var(--line)',
          strong:  'var(--line-strong)',
          brand:   'var(--line-brand)',
        },

        /* legacy compatibility */
        cyan: {
          400: '#8DF0FA',
          500: '#33D6E5',
          600: '#1D9FB4',
          950: '#0D1E27',
        },
        blue: {
          500: '#4F7BB8',
          600: '#4F7BB8',
          950: '#0e1829',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      backdropBlur: { xs: '2px' },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'brand-sm':   'var(--shadow-sm)',
        'brand-md':   'var(--shadow-md)',
        'brand-lg':   'var(--shadow-lg)',
        'brand-glow': 'var(--shadow-glow)',
      },
      transitionTimingFunction: {
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      animation: {
        'fade-in':         'fadeIn 0.5s ease-in-out',
        'slide-up':        'slideUp 0.5s ease-out',
        float:             'float 3s ease-in-out infinite',
        'pulse-slow':      'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        marquee:           'marquee 25s linear infinite',
        'accordion-down':  'accordion-down 0.2s ease-out',
        'accordion-up':    'accordion-up 0.2s ease-out',
        'glow-pulse':      'glowPulse 2.5s ease-in-out infinite',
        shimmer:           'shimmer 3s linear infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        float:   { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-100%)' } },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(51,214,229,0.3),0 0 40px rgba(51,214,229,0.15)' },
          '50%':      { boxShadow: '0 0 40px rgba(51,214,229,0.6),0 0 80px rgba(51,214,229,0.3)' },
        },
        shimmer: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up':   { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
