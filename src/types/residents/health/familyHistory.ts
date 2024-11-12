export interface IFamilyHistory {
  id: number
  idResidente: number
  idParentesco: number
  antecedentes: string
}

export interface IFamilyHistoryForm {
  idParentesco: number
  antecedentes: string
}
