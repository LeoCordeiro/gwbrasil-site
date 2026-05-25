import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1B2B6B',
          secondary: '#E8821A',
          background: '#F5F7FA',
          surface: '#FFFFFF',
        }
      }
    }
  }
})
