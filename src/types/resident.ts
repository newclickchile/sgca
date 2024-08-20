export interface NewResidentType {
  nombre: string
  rut: string
  fechaNacimiento: string
  codsis: number
  idGenero: number
}

export interface ResidentType {
  id: number
  nombre: string
  habilitado: boolean
  rut: string
  fechaNacimiento: string
  codsis: number
  idGenero: number
  flagRsh: boolean
  direccion: string
  idCasa: number
  idPrograma: number
  discapicidad: string
  hobbie: string
  fechaIngreso: string
  fechaEgreso: string
  nombrePadre: string
  ocupacionPadre: string
  fechaNacimientoPadre: string
  direccionPadre: string
  condicionPadre: string
  nombreMadre: string
  ocupacionMadre: string
  fechaNacimientoMadre: string
  direccionMadre: string
  condicionMadre: string
}
