import ResidentDetails from '@/views/residents/details'

const ResidentsDetailsPage = async ({ params }: { params: { id: string } }) => {
  return <ResidentDetails residentId={params.id} />
}

export default ResidentsDetailsPage
