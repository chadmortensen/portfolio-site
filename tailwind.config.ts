import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

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
				DEFAULT: '0.375rem',
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
				'water-ripple': {
					'0%': { 
						transform: 'scale(0.8)',
						opacity: '0',
						filter: 'blur(10px)'
					},
					'20%': {
						transform: 'scale(0.95)',
						opacity: '0.3',
						filter: 'blur(5px)'
					},
					'40%': {
						transform: 'scale(1.02)',
						opacity: '0.7',
						filter: 'blur(2px)'
					},
					'60%': {
						transform: 'scale(0.98)',
						opacity: '0.9',
						filter: 'blur(1px)'
					},
					'80%': {
						transform: 'scale(1.01)',
						opacity: '0.95',
						filter: 'blur(0.5px)'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1',
						filter: 'blur(0px)'
					}
				},
				'ripple-overlay': {
					'0%': {
						transform: 'scale(0)',
						opacity: '0.8'
					},
					'100%': {
						transform: 'scale(4)',
						opacity: '0'
					}
				},
				'slot-machine': {
					'0%': { 
						transform: 'translateY(0)',
						opacity: '1'
					},
					'25%': { 
						transform: 'translateY(-20px)',
						opacity: '0.3'
					},
					'50%': { 
						transform: 'translateY(20px)',
						opacity: '0.1'
					},
					'75%': { 
						transform: 'translateY(-10px)',
						opacity: '0.5'
					},
					'100%': { 
						transform: 'translateY(0)',
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
				'water-ripple': 'water-ripple 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'ripple-overlay': 'ripple-overlay 1s ease-out',
				'slot-machine': 'slot-machine 0.6s ease-in-out'
			}
		}
	},
        plugins: [tailwindcssAnimate, typography],
} satisfies Config;
