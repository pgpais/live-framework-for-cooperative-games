import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
	name: 'my-custom-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '12px',
		'--theme-border-base': '2px',
		// =~= Theme On-X Colors =~=
		'--on-primary': 'var(--color-tertiary-900)',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '255 255 255',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #cccfd6
		'--color-primary-50': '247 248 249', // #f7f8f9
		'--color-primary-100': '245 245 247', // #f5f5f7
		'--color-primary-200': '242 243 245', // #f2f3f5
		'--color-primary-300': '235 236 239', // #ebecef
		'--color-primary-400': '219 221 226', // #dbdde2
		'--color-primary-500': '204 207 214', // #cccfd6
		'--color-primary-600': '184 186 193', // #b8bac1
		'--color-primary-700': '153 155 161', // #999ba1
		'--color-primary-800': '122 124 128', // #7a7c80
		'--color-primary-900': '100 101 105', // #646569
		// secondary | #1c71d8
		'--color-secondary-50': '221 234 249', // #ddeaf9
		'--color-secondary-100': '210 227 247', // #d2e3f7
		'--color-secondary-200': '198 220 245', // #c6dcf5
		'--color-secondary-300': '164 198 239', // #a4c6ef
		'--color-secondary-400': '96 156 228', // #609ce4
		'--color-secondary-500': '28 113 216', // #1c71d8
		'--color-secondary-600': '25 102 194', // #1966c2
		'--color-secondary-700': '21 85 162', // #1555a2
		'--color-secondary-800': '17 68 130', // #114482
		'--color-secondary-900': '14 55 106', // #0e376a
		// tertiary | #273249
		'--color-tertiary-50': '223 224 228', // #dfe0e4
		'--color-tertiary-100': '212 214 219', // #d4d6db
		'--color-tertiary-200': '201 204 210', // #c9ccd2
		'--color-tertiary-300': '169 173 182', // #a9adb6
		'--color-tertiary-400': '104 112 128', // #687080
		'--color-tertiary-500': '39 50 73', // #273249
		'--color-tertiary-600': '35 45 66', // #232d42
		'--color-tertiary-700': '29 38 55', // #1d2637
		'--color-tertiary-800': '23 30 44', // #171e2c
		'--color-tertiary-900': '19 25 36', // #131924
		// success | #84cc16
		'--color-success-50': '237 247 220', // #edf7dc
		'--color-success-100': '230 245 208', // #e6f5d0
		'--color-success-200': '224 242 197', // #e0f2c5
		'--color-success-300': '206 235 162', // #ceeba2
		'--color-success-400': '169 219 92', // #a9db5c
		'--color-success-500': '132 204 22', // #84cc16
		'--color-success-600': '119 184 20', // #77b814
		'--color-success-700': '99 153 17', // #639911
		'--color-success-800': '79 122 13', // #4f7a0d
		'--color-success-900': '65 100 11', // #41640b
		// warning | #ed7b2e
		'--color-warning-50': '252 235 224', // #fcebe0
		'--color-warning-100': '251 229 213', // #fbe5d5
		'--color-warning-200': '251 222 203', // #fbdecb
		'--color-warning-300': '248 202 171', // #f8caab
		'--color-warning-400': '242 163 109', // #f2a36d
		'--color-warning-500': '237 123 46', // #ed7b2e
		'--color-warning-600': '213 111 41', // #d56f29
		'--color-warning-700': '178 92 35', // #b25c23
		'--color-warning-800': '142 74 28', // #8e4a1c
		'--color-warning-900': '116 60 23', // #743c17
		// error | #c01c28
		'--color-error-50': '246 221 223', // #f6dddf
		'--color-error-100': '242 210 212', // #f2d2d4
		'--color-error-200': '239 198 201', // #efc6c9
		'--color-error-300': '230 164 169', // #e6a4a9
		'--color-error-400': '211 96 105', // #d36069
		'--color-error-500': '192 28 40', // #c01c28
		'--color-error-600': '173 25 36', // #ad1924
		'--color-error-700': '144 21 30', // #90151e
		'--color-error-800': '115 17 24', // #731118
		'--color-error-900': '94 14 20', // #5e0e14
		// surface | #313d5b
		'--color-surface-50': '224 226 230', // #e0e2e6
		'--color-surface-100': '214 216 222', // #d6d8de
		'--color-surface-200': '204 207 214', // #cccfd6
		'--color-surface-300': '173 177 189', // #adb1bd
		'--color-surface-400': '111 119 140', // #6f778c
		'--color-surface-500': '49 61 91', // #313d5b
		'--color-surface-600': '44 55 82', // #2c3752
		'--color-surface-700': '37 46 68', // #252e44
		'--color-surface-800': '29 37 55', // #1d2537
		'--color-surface-900': '24 30 45' // #181e2d
	}
};
