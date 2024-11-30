import type { IMedicalFaq } from './medicalFAQ'

export interface IResidentMedicalHistory {
  idResidente: number
  faq?: IMedicalFaq
  comentario: string
  idFaq: number
}
