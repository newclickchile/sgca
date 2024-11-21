export interface IJudicialInformation {
  idResidente: number
  rit: string
  ruc: string
  tribunal: string
  calidadJuridica: string
  causalIngreso: string
  nombreCurador: string
  fechaEntrevista: string
  institucion: string
  comentario: string
  nombreAdultoResponsable: string
  rut: string
  domicilio: string
  email: string
  telefono: string
}

export interface IJudicialCurator {
  idResidente: number
  nombreCurador: string
  fechaEntrevista: string
  institucion: string
  comentario: string
}

export interface IJudicialResponsibleAdult {
  idResidente: number
  nombreAdulto: string
  rut: string
  domicilio: string
  email: string
  telefono: string
}
