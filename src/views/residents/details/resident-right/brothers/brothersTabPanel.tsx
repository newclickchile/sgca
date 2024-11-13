// import { useState } from 'react'
// import { useSession } from 'next-auth/react'
// import { toast } from 'react-toastify'
import { Box } from '@mui/material'

// import CustomForm from '@/components/forms/CustomForm'
// import { useResident } from '@/contexts/residentContext'
// import type { IBrotherForm } from '@/types/residents/familyGroup/brothersTab'
// import { fetchData } from '@/utils/fetch'
// import { fields } from './form'
//const URL_RESIDENTS = `${process.env.NEXT_PUBLIC_API_URL_RESIDENTES}/residente`
const BrothersTabPanel = () => {
  // const { data: session } = useSession()
  // const { resident } = useResident()
  // const [brothersCount] = useState(1)
  // const brothersArray = Array.from({ length: brothersCount })
  // const handleAddBrother = () => {
  //   if (brothersCount >= 4) return
  //   setBrothersCount(brothersCount + 1)
  // }
  // const handleRemoveBrother = () => {
  //   if (brothersCount <= 1) return
  //   if (brothersCount > 0) {
  //     setBrothersCount(brothersCount - 1)
  //   }
  // }
  // const onSubmit = async (data: IBrotherForm) => {
  //   try {
  //     const queryParams = new URLSearchParams(data as Record<string, string>).toString()
  //     const response = await fetchData({
  //       endpoint: `${URL_RESIDENTS}/padres/actualizar?idResidente=${resident.id}&${queryParams}`,
  //       session,
  //       method: 'POST'
  //     })
  //     console.log('response :', response)
  //     if (response.status === 200) {
  //       toast.success('Datos actualizados correctamente')
  //       //updateResident({ ...resident, ...updatedData })
  //     }
  //   } catch (error) {
  //     toast.error('¡Ha ocurrido un error, favor intenta nuevamente!')
  //   }
  // }
  return (
    <>
      <Box mt={5}>
        {/* {brothersArray.map((_, index) => (
          <Box key={`brother${index}`}>
            <Grid item xs={12} sx={{ my: 3 }}>
              <Typography variant='button' sx={{ color: 'primary.main' }}>
                Hermano {index + 1}
              </Typography>
            </Grid>
            <CustomForm<IBrotherForm>
              fields={fields}
              defaultValues={{
                brotherName: '',
                birthDate: '',
                comment: ''
              }}
              onSubmit={onSubmit}
            />
          </Box>
        ))}
        <Grid item xs={12} pt={4}>
          <Button type='submit' variant='contained' sx={{ mr: 4 }}>
            Guardar
          </Button>
        </Grid> */}
      </Box>
    </>
  )
}

export default BrothersTabPanel
