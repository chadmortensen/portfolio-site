
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Swiss Design Colors
				swiss: {
					charcoal: 'hsl(var(--swiss-charcoal))',
					gray: 'hsl(var(--swiss-gray))',
					medium: 'hsl(var(--swiss-medium))',
					light: 'hsl(var(--swiss-light))',
					paper: 'hsl(var(--swiss-paper))',
					pure: 'hsl(var(--swiss-pure))'
				},
				// Accent Colors
				'accent-blue': 'hsl(var(--accent-blue))',
				'accent-teal': 'hsl(var(--accent-teal))',
				'accent-orange': 'hsl(var(--accent-orange))',
				'accent-aqua': 'hsl(var(--accent-aqua))',
				// Semantic Colors
				'text-primary': 'hsl(var(--text-primary))',
				'text-secondary': 'hsl(var(--text-secondary))',
				'text-tertiary': 'hsl(var(--text-tertiary))',
				'surface-primary': 'hsl(var(--surface-primary))',
				'surface-secondary': 'hsl(var(--surface-secondary))',
				'surface-tertiary': 'hsl(var(--surface-tertiary))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
			},
			spacing: {
				'18': '4.5rem',
				'22': '5.5rem',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'water-emerge-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(40px) scale(0.9)',
						filter: 'blur(8px)'
					},
					'30%': {
						opacity: '0.3',
						transform: 'translateY(20px) scale(0.95)',
						filter: 'blur(4px)'
					},
					'70%': {
						opacity: '0.7',
						transform: 'translateY(8px) scale(0.98)',
						filter: 'blur(2px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) scale(1)',
						filter: 'blur(0px)'
					}
				},
				'water-emerge-out': {
					'0%': {
						opacity: '1',
						transform: 'translateY(0) scale(1)',
						filter: 'blur(0px)'
					},
					'30%': {
						opacity: '0.7',
						transform: 'translateY(-8px) scale(0.98)',
						filter: 'blur(2px)'
					},
					'70%': {
						opacity: '0.3',
						transform: 'translateY(-20px) scale(0.95)',
						filter: 'blur(4px)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(-40px) scale(0.9)',
						filter: 'blur(8px)'
					}
				},
				'sparkle': {
					'0%, 100%': { 
						transform: 'scale(0) rotate(0deg)',
						opacity: '0'
					},
					'25%': {
						transform: 'scale(1) rotate(90deg)',
						opacity: '1'
					},
					'50%': {
						transform: 'scale(1.2) rotate(180deg)',
						opacity: '0.8'
					},
					'75%': {
						transform: 'scale(0.8) rotate(270deg)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'water-emerge-in': 'water-emerge-in 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
				'water-emerge-out': 'water-emerge-out 0.4s cubic-bezier(0.7, 0, 0.84, 0)',
				'sparkle': 'sparkle 1s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
