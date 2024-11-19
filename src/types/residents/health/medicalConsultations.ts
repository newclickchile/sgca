export interface IMedicalConsultation {
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

export interface IMedicalConsultationDocuments {
  id: number
  idConsulta: number
  nombreDocumento: string
  fechaDocumento: string
  responsable: string
  linkDocumento: string
}
