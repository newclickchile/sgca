export interface INewResident {
  rut: string
  nombre: string
  fechaNacimiento: string
  codsis: number
  idGenero: number
}

export interface IUpdateResident {
  rut: string
  nombre: string
  fechaNacimiento: string
  codigosis: number
  genero: number
  flagRsh: boolean
  direccion: string
  casa: number
  programa: number
  discapacidad: string
  hobbie: string
}

export interface IResident {
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
