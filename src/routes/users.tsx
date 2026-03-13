import { UsersList } from '@/components/UsersList'
import { getUsers } from '@/serverActions/usersActions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users')({
  loader: async () => {
    return getUsers()
  },
  component: RouteComponent,
})

function RouteComponent() {
  const users = Route.useLoaderData() || []
  return <div><UsersList users={users} /></div>
}
