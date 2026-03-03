import type { Note } from '@/types/notes'
import { Button, Card, Divider, Label, makeStyles, Title2 } from '@fluentui/react-components'
import { NoteForm } from './NoteForm'
import { deleteNote } from '@/serverActions/notesActions'
import { useRouter } from '@tanstack/react-router'

interface NotesListProps {
  notes: Note[]
}

const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    margin: '0 auto 16px',
    [`@media (min-width: ${breakpoints.sm})`]: { width: '540px' }, // sm
    [`@media (min-width: ${breakpoints.md})`]: { width: '720px' }, // md
    [`@media (min-width: ${breakpoints.lg})`]: { width: '900px' }, // lg
  },
  card: {
    margin: "auto",
    width: "720px",
    maxWidth: "100%",
    marginBottom: "16px",
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: "8px",
  },
})

export function NotesList({ notes }: NotesListProps) {
  const styles = useStyles()
  const router = useRouter()

  if (!notes || notes.length === 0) {
    return <p>No notes available.</p>
  }

  const handleDelete = async (id: string) => {
    console.log('Delete note with id:', id)

    if (!id) {
      console.error('Invalid ID for deletion:', id)
      return
    }

    try {
      await deleteNote({ data: { id } })
      await router.invalidate()
    } catch (error) {
      console.error('Error in handleDelete:', error)
    }
  }

  return (
    <div className={styles.container}>
      <Title2>Notes Collection</Title2>
      <Label>This page implements note collection by reading and writing a file method.</Label>
      <NoteForm />
      {notes.map((note) => (
        <Card key={note.id} className={styles.card}>
          <p className={styles.cardTitle}>{note.question}</p>
          <Divider />
          <p>{note.answer}</p>
          <Button appearance="primary" onClick={() => handleDelete(note.id)}>Delete</Button>
        </Card>
      ))}
    </div>
  )
}