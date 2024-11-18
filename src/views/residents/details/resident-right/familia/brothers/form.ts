import type { FieldConfig } from '@/components/forms/CustomForm'

export const fields = (isDrawer: boolean = true): FieldConfig[] => {
  return [
    {
      name: 'nombre',
      label: 'Nombre',
      isRequired: true,
      width: isDrawer ? 12 : 9
    },
    {
      name: 'fechaNacimiento',
      label: 'Fecha Nacimiento',
      width: isDrawer ? 12 : 3,
      type: 'datepicker'
    },
    {
      name: 'comentario',
      label: 'Comentario',
      type: 'multiline',
      width: isDrawer ? 12 : 9,
      rows: 3
    },
    {
      name: 'ingresadoAlaRed',
      label: 'Ingresado en la red',
      width: isDrawer ? 12 : 3,
      type: 'checkbox'
    }
  ]
}
