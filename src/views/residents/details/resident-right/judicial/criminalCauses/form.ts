import type { FieldConfig } from '@/components/forms/CustomForm'
import type { AuxProsecutorsType } from '@/types/aux'

export const fields = (prosecutors: AuxProsecutorsType[], isDrawer: boolean = true): FieldConfig[] => {
  const prosecutorsOptions = prosecutors.map(prosecutor => ({
    id: prosecutor.id.toString(),
    nombre: prosecutor.fiscalias,
    descripcion: prosecutor.region
  }))

  return [
    {
      name: 'idFiscalia',
      label: 'Fiscalía',
      isRequired: true,
      type: 'select',
      listValues: prosecutorsOptions,
      width: isDrawer ? 12 : 6
    },
    {
      name: 'tribunal',
      label: 'Tribunal',
      width: isDrawer ? 12 : 6
    },
    {
      name: 'ruc',
      label: 'RUC',
      width: isDrawer ? 12 : 3
    },
    {
      name: 'rit',
      label: 'RIT',
      width: isDrawer ? 12 : 3
    }
  ]
}
