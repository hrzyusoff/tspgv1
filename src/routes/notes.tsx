import { NotesList } from '@/components/NotesList'
import { getNotes } from '@/serverActions/notesActions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/notes')({
  loader: async () => {
    return getNotes()
  },
  component: NotesComponent,
})

function NotesComponent() {
  const notes = Route.useLoaderData() || []
  return <div><NotesList notes={notes} /></div>
}
