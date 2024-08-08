import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Administrador',
    icon: 'eos-icons-admin-outlined',
    children: [
      {
        id: 'residents',
        label: 'Residentes',
        icon: 'ri-group-line text-[20px]',
        href: '/apps/children/list'
      }
    ]
  },
  {
    label: 'Gestión',
    icon: 'mage-preview-circle-fill',
    children: [
      {
        id: 'reports',
        label: 'Informes',
        icon: 'ri-file-copy-2-line text-[20px]',
        href: '/informes'
      }
    ]
  },
  {
    label: 'Actividades',
    icon: 'ri-apps-2-line',
    children: [
      {
        id: 'daily',
        label: 'Diarias',
        href: '/apps/revision',
        icon: 'ri-calendar-event-line text-[20px]'
      }
    ]
  }
]

export default verticalMenuData
