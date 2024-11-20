import type { FieldConfig } from '@/components/forms/CustomForm'
import type { AuxCausesAdmissionType } from '@/types/aux'

export const fields = (causes: AuxCausesAdmissionType[]): FieldConfig[] => {
  const causesOptions = causes.map(cause => ({
    id: cause.id.toString(),
    nombre: cause.causa
  }))

  return [
    {
      name: 'rit',
      label: 'RIT',
      width: 4,
      isRequired: true
    },
    {
      name: 'calidadJuridica',
      label: 'Calidad Jurídica',
      isRequired: true,
      width: 4
    },
    {
      name: 'causalIngreso',
      label: 'Causal de Ingreso',
      width: 4,
      isRequired: true,
      listValues: causesOptions
    },
    {
      name: 'tribunal',
      label: 'Tribunal',
      width: 6,
      isRequired: true
    },
    {
      name: 'ruc',
      label: 'RUC',
      width: 12,
      isRequired: true
    }
  ]
}
