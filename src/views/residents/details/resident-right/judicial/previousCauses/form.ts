import type { FieldConfig } from '@/components/forms/CustomForm'

export const fields = (isDrawer: boolean = true): FieldConfig[] => {
  return [
    {
      name: 'rit',
      label: 'RIT',
      isRequired: true,
      width: isDrawer ? 12 : 3
    },
    {
      name: 'tribunal',
      label: 'Tribunal',
      width: isDrawer ? 12 : 7
    }
  ]
}
