import type { VerticalMenuDataType } from '@/types/menuTypes'

export const filterMenu = (menuData: VerticalMenuDataType[], activeMenuIds: string[]): VerticalMenuDataType[] => {
  const menus = menuData.reduce((filteredMenu: any[], item) => {
    // Verifica si el item tiene un id y si este id está en activeMenuIds

    if ('permission' in item && item.permission !== undefined && activeMenuIds.includes(item.permission as string)) {
      // Crea una copia del item para evitar mutar el original
      const filteredItem: VerticalMenuDataType = { ...item }

      // Filtra los hijos recursivamente si existen
      if ('children' in filteredItem && filteredItem.children) {
        filteredItem.children = filterMenu(filteredItem.children, activeMenuIds)
      }

      filteredMenu.push(filteredItem)
    } else if ('children' in item && item.children) {
      // Si el item tiene hijos, los filtra también
      const filteredChildren = filterMenu(item.children, activeMenuIds)

      if (filteredChildren.length > 0) {
        // Solo agrega el item si tiene hijos filtrados
        filteredMenu.push({ ...item, children: filteredChildren })
      }
    }

    return filteredMenu
  }, [])

  return menus
}
