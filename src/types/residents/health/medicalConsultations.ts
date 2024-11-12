export interface IMedicalConsultations {
  id: number
  idResidente: number
  centroAsistencial: string
  fechaConsulta: string
  medico: string
  especialidad: string
  motivo: string
  diagnostico: string
  fechaRegistro: string
  responsable: string
}

export interface IMedicalConsultationsForm {
  centroAsistencial: string
  fechaConsulta: string
  medico: string
  especialidad: string
  motivo: string
  diagnostico: string
  fechaRegistro: string
  responsable: string
}
