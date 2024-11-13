'use client'
import { useEffect, useMemo, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import './Residents.css'
import {
  Alert,
  Button,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Typography
} from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import type { TextFieldProps } from '@mui/material/TextField'
import TextField from '@mui/material/TextField'
import type { RankingInfo } from '@tanstack/match-sorter-utils'
import { rankItem } from '@tanstack/match-sorter-utils'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import classnames from 'classnames'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useLocalStorage } from 'react-use'
import { useSession } from 'next-auth/react'

import FilterSelect from '@/components/forms/FilterSelect'
import ResidentDrawer from '@/components/residents/ResidentDrawer'
import useFetchData from '@/hooks/useFetchData'
import type { AuxHousesType, AuxProgramType } from '@/types/aux'
import type { INewResident, IResident } from '@/types/residents/service'
import tableStyles from '@core/styles/table.module.css'
import { fetchData } from '@/utils/fetch'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}
type ResidentTypeWithAction = IResident & {
  action?: string
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({
    itemRank
  })

  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <TextField {...props} value={value} onChange={e => setValue(e.target.value)} size='small' />
}

// Column Definitions
const columnHelper = createColumnHelper<ResidentTypeWithAction>()
const URL_RESIDENTS = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente/obtener/bycasa`

const Residents = ({ houses, programs }: { houses: AuxHousesType[]; programs: AuxProgramType[] }) => {
  const { data: session } = useSession()
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [residents, setResidents] = useState<any[]>([])
  const [resetDrawerForm, setResetDrawerForm] = useState<boolean>(false)
  const router = useRouter()
  const [selectedHouse, setSelectedHouse] = useLocalStorage('homeId', '')

  const columns = useMemo<ColumnDef<ResidentTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('codsis', {
        size: 100,
        header: 'SIS',
        cell: ({ row }) => <Typography color='primary'>{`${row.original.codsis}`}</Typography>
      }),
      columnHelper.accessor('nombre', {
        header: 'Nombre',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography className='font-medium' color='text.primary'>
                {row.original.nombre}
              </Typography>
              <Typography variant='body2'>{row.original.rut}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('idCasa', {
        header: 'Casa',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {houses.find(house => house.id === row.original.idCasa)?.casa}
          </Typography>
        )
      }),
      columnHelper.accessor('habilitado', {
        size: 100,
        header: 'Estado',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip
              variant='tonal'
              label={row.original.habilitado ? 'Activo' : 'Inactivo'}
              size='small'
              color={row.original.habilitado ? 'success' : 'secondary'}
              className='capitalize'
            />
          </div>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Acciones',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton>
              <Link href={`/residentes/${row.original.id}`} className='flex'>
                <i className='ri-eye-line' />
              </Link>
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    [houses]
  )

  const table = useReactTable({
    data: residents,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const {
    data: residentData,
    error,
    loading
  } = useFetchData<IResident[]>({
    endpoint: `${URL_RESIDENTS}?idCasa=${selectedHouse}`,
    method: 'GET',
    shouldFetch: selectedHouse !== ''
  })

  useEffect(() => {
    if (selectedHouse === '') {
      setResidents([])
    } else if (residentData) {
      setResidents(residentData)
    }
  }, [residentData, selectedHouse])

  const handleDrawerOpen = () => {
    if (!selectedHouse) return

    // Al abrir el Drawer se setea el reset en false para que se pueda cerrar sin borrar la data
    // esto es porque al hacer Submit del form se deja setResetDrawerForm en true
    setResetDrawerForm(false)
    setAddUserOpen(true)
  }

  const handleDrawerClose = () => {
    setAddUserOpen(false)
  }

  const handleCancel = () => {
    handleDrawerClose()
  }

  const onSubmit: SubmitHandler<INewResident> = async (newResident: INewResident) => {
    console.log('newResident :', newResident)

    try {
      if (!session?.user) {
        toast.error('¡Sesión no válida!')

        return
      }

      const queryParams = new URLSearchParams(newResident as unknown as Record<string, string>).toString()

      console.log('queryParams :', queryParams)

      const response = await fetchData({
        endpoint: `${URL_RESIDENTS}/crear?${queryParams}`,
        session,
        method: 'POST'
      })

      console.log('response :', response)
      toast.success('Se han actualizado los datos correctamente')
    } catch (error) {
      toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
    }
  }

  // const onSubmit: SubmitHandler<INewResident> = async (data: INewResident) => {
  //   try {
  //     console.log('data :', data)
  //     handleCancel()
  //     setResetDrawerForm(true)
  //     toast.success('Se ha creado el nuevo residente')
  //   } catch (error) {
  //     toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
  //   }
  // }
  const handleNavigation = (id: string) => {
    router.push(`/residentes/${id}`)
  }

  return (
    <Grid>
      <Card>
        <CardHeader title='Residentes' />
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <FilterSelect
                options={houses.map(house => ({
                  id: house.id.toString(),
                  label: house.casa
                }))}
                value={selectedHouse || ''}
                onChange={setSelectedHouse}
                label='Seleccionar Casa'
                placeholder='Seleccionar Casa'
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <div className='flex justify-between p-5 gap-4 flex-col items-start sm:flex-row sm:items-center'>
          <Button
            variant='contained'
            onClick={handleDrawerOpen}
            disabled={!selectedHouse}
            className='is-full sm:is-auto'
          >
            Agregar nuevo Residente
          </Button>
          <div className='flex items-center gap-x-4 is-full gap-4 flex-col sm:is-auto sm:flex-row'>
            <DebouncedInput
              value={globalFilter ?? ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='start'>
                    <i className='ri-search-line text-[15px] text-textPrimary' />
                  </InputAdornment>
                )
              }}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Buscar Usuario'
              className='is-full sm:is-auto'
            />
          </div>
        </div>
        <div className='overflow-x-auto'>
          {error && <Alert severity='error'>Ha ocurrido un error al obtener los residentes</Alert>}
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <Grid>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='ri-arrow-up-s-line text-xl' />,
                              desc: <i className='ri-arrow-down-s-line text-xl' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        </Grid>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    <Grid item container alignItems={'center'} justifyContent={'center'}>
                      <CircularProgress size={20} color='primary' />
                    </Grid>
                  </td>
                </tr>
              </tbody>
            ) : table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    ¡No existe información!
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr
                        onClick={() => handleNavigation(row.original.id)}
                        key={row.id}
                        className={classnames('clickable-row', { selected: row.getIsSelected() })}
                      >
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
      </Card>
      <ResidentDrawer
        houses={houses}
        programs={programs}
        handleCancel={handleCancel}
        open={addUserOpen}
        handleClose={handleDrawerClose}
        onSubmit={onSubmit}
        resetForm={resetDrawerForm}
      />
    </Grid>
  )
}

export default Residents
