const iconSize = 'text-[18px]'

const verticalMenuData = (): any[] => [
  {
    label: 'Administrador',
    icon: 'eos-icons-admin-outlined',
    children: [
      {
        href: '/residentes',
        permission: 'residents',
        label: 'Residentes',
        icon: `ri-group-line ${iconSize}`
      }
    ]
  },
  {
    label: 'Gestión',
    icon: 'mage-preview-circle-fill',
    children: [
      {
        permission: 'reports',
        label: 'Informes',
        icon: `ri-file-copy-2-line ${iconSize}`,
        href: '/informes'
      }
    ]
  },
  {
    label: 'Actividades',
    icon: 'ri-apps-2-line',
    children: [
      {
        permission: 'daily',
        label: 'Diarias',
        href: '/apps/revision',
        icon: `ri-calendar-event-line ${iconSize}`
      }
    ]
  }
]

export default verticalMenuData
