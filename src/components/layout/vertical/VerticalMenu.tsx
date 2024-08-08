import { useMemo } from 'react'

import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import { useSession } from 'next-auth/react'

import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu } from '@menu/vertical-menu'

// import { GenerateVerticalMenu } from '@components/GenerateMenu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import { GenerateVerticalMenu } from '@/components/GenerateMenu'
import verticalMenuData from '@/data/navigation/verticalMenuData'
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

import type { VerticalMenuDataType } from '@/types/menuTypes'

const filterMenu = (menuData: VerticalMenuDataType[], activeMenuIds: string[]): VerticalMenuDataType[] => {
  return menuData.reduce((filteredMenu: VerticalMenuDataType[], item) => {
    // Verifica si el item tiene un id y si este id está en activeMenuIds
    if ('id' in item && item.id !== undefined && activeMenuIds.includes(item.id)) {
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
}

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()

  const { data } = useSession()

  const menuPages = useMemo(() => {
    const sessionUserPages = data?.user.menu_left || []

    return filterMenu(verticalMenuData(), sessionUserPages)
  }, [data?.user.menu_left])

  const verticalNavOptions = useVerticalNav()

  const { isBreakpointReached } = useVerticalNav()

  // Vars
  const { transitionDuration } = verticalNavOptions

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 10 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <GenerateVerticalMenu menuData={menuPages} />
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
