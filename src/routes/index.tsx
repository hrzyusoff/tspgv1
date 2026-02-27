import { JokesList } from '@/components/JokesList'
import { getJokes } from '@/serverActions/jokesActions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: async () => {
    return getJokes()
  },
  component: App
})

function App() {
  const jokes = Route.useLoaderData() || []
  return (
    <div>
      <JokesList jokes={jokes} />
    </div>
  )
}
