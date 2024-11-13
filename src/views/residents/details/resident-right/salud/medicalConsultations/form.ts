import type { FieldConfig } from '@/components/forms/CustomForm'

export const formFields: FieldConfig[] = [
  {
    name: 'centroAsistencial',
    label: 'Centro Asistencial',
    isRequired: true,
    width: 8
  },
  {
    name: 'fechaConsulta',
    label: 'Fecha',
    isRequired: true,
    type: 'datepicker',
    width: 4
  },
  {
    name: 'medico',
    label: 'Médico',
    isRequired: true,
    width: 7
  },
  {
    name: 'especialidad',
    label: 'Especialidad',
    isRequired: true,
    width: 5
  },
  {
    name: 'motivo',
    label: 'Motivo',
    isRequired: true,
    width: 8
  },
  {
    name: 'responsable',
    label: 'Responsable',
    isRequired: true,
    width: 4
  },
  {
    name: 'diagnostico',
    label: 'Diagnóstico',
    type: 'multiline',
    rows: 3,
    width: 12
  }
]
