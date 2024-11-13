export interface IMedicalHistory {
  idResidente: number
  faq: Faq
  comentario: string
  idFaq: number
}
export interface Faq {
  casa: string
  tipo: number
  isHabilitado: boolean
  id: number
}
