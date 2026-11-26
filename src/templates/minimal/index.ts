import { extendTheme } from '@chakra-ui/react'
import terminal from '../terminal'
import { Layout, Home, Experience, Publications } from './Pages'
import type { TemplateConfig } from '../types'

const minimal: TemplateConfig = {
  id: 'minimal',
  name: 'Minimal',
  theme: extendTheme({}),
  layout: Layout,
  pages: { ...terminal.pages, home: Home, experience: Experience, publications: Publications },
  slots: terminal.slots,
}

export default minimal
