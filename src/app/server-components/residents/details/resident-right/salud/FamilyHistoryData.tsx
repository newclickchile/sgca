import type { AuxParentsType } from '@/types/aux'

// interface FamilyHistoryServerProps {
//   residentId: number
//   parents: AuxParentsType[]
// }

const FamilyHistoryServerComponent = async ({
  residentId,
  parents
}: {
  residentId: number
  parents: AuxParentsType[]
}) => {
  //const FamilyHistoryServerComponent({ residentId, parents }: FamilyHistoryServerProps) {
  // Obtener la sesión en el servidor
  //const session = await getServerSession(authOptions)

  try {
    // Puedes pasar los datos obtenidos a tu componente de presentación
    // return <FamilyHistoryTabPanel familyHistoryData={familyHistoryData} parents={parents} />
    return <>{JSON.stringify(parents)}</>
  } catch (error) {
    console.error('Error fetching family history:', error)

    return <div>Error fetching family history</div>
  }
}

export default FamilyHistoryServerComponent
