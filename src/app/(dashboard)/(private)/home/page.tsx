import Home from '@/views/Home'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/pages/pricing` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

const getPricingData = async () => {
  // Vars
  const url = `${process.env.NEXT_PUBLIC_API_URL}houses`

  console.log('url :', url)
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const response = await res.json()

  console.log('response :', response)

  return response
}

const HomePage = async () => {
  const data = await getPricingData()

  return (
    <div>
      {JSON.stringify(data)}
      <Home data={data} />
    </div>
  )
}

export default HomePage
