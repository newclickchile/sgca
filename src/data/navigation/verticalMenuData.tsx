import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Administrador',
    icon: 'ri-file-copy-line',
    children: [
      {
        label: 'Residentes',
        children: [
          {
            id: 'residents-1',
            label: 'Residentes 1',
            icon: 'ri-file-copy-line',
            href: '/apps/children/list'
          },
          {
            id: 'residents-2',
            label: 'Residentes 2',
            icon: 'ri-file-copy-line',
            href: '/apps/children/list2'
          }
        ]
      }
    ]
  },
  {
    label: 'Gestión',
    icon: 'ri-file-copy-line',
    children: [
      {
        id: 'reports',
        label: 'Informes',
        icon: 'ri-file-copy-line',
        href: '/apps/app1'
      }
    ]
  },
  {
    label: 'Menú Ejemplo (sin children)',
    id: 'childless',
    icon: 'ri-file-copy-line',
    href: '/apps/resumen'
  },
  {
    label: 'Actividades',
    icon: 'ri-pantone-line',
    children: [
      {
        id: 'daily',
        label: 'Diarias',
        href: '/apps/revision',
        icon: 'ph:calendar-dots'
      },
      {
        id: 'weekly',
        label: 'Semanales',
        href: '/apps/revision',
        icon: 'ph:calendar-dots'
      },
      {
        label: 'Mensuales',
        icon: 'ri-file-copy-line',
        children: [
          {
            id: 'monthly-1',
            label: 'Mensuales 1',
            icon: 'ri-file-copy-line',
            href: '/apps/children/list'
          },
          {
            id: 'monthly-2',
            label: 'Mensuales 2',
            icon: 'ri-file-copy-line',
            href: '/apps/children/list2'
          },
          {
            id: 'monthly-3',
            label: 'Mensuales 3',
            icon: 'ri-file-copy-line',
            href: '/apps/children/list3'
          }
        ]
      }
    ]
  }
]

export default verticalMenuData
