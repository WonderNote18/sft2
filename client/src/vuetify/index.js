import 'vuetify/styles'
import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const projectTheme = {
  dark: true,
  colors: {
    background: '#37474F',
    surface: '#455A64',
    primary: '#FFFFFF',
    secondary: '#B0BEC5',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',
  }
}

const AppVuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'projectTheme',
    themes: {
      projectTheme
    }
  }
})

export default AppVuetify;