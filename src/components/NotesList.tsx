import type { Note } from '@/types/notes'
import { Button, Divider, Label, makeStyles, Subtitle1, Title2 } from '@fluentui/react-components'
import { NoteForm } from './NoteForm'
import { deleteNote } from '@/serverActions/notesActions'
import { useRouter } from '@tanstack/react-router'
import { BackNav } from './BackNav'

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
    justifyContent: 'center',

    gap: '16px',
    width: '100%',
    paddingTop: '5%',
    paddingBottom: '5%',
    margin: '0 auto 16px',
    [`@media (min-width: ${breakpoints.sm})`]: { width: '540px' }, // sm
    [`@media (min-width: ${breakpoints.md})`]: { width: '720px' }, // md
    [`@media (min-width: ${breakpoints.lg})`]: { width: '900px' }, // lg
  },
  notesCardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  },
  noteCard: {
    border: "4px solid",
    padding: "8px 16px 16px 16px",
  },
  noteCardTop: {
    display: "flex",
    justifyContent: "flex-end",
    "& Button": {
      minWidth: "24px",
      padding: "0",
    },
    "& Button:hover": {
      color: "#E84641",
    },
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
      <Title2><BackNav /> Notes Collection</Title2>
      <Label>This page implements note collection by reading and writing a file method.</Label>
      <Subtitle1>Jot Down Your Notes Here</Subtitle1>
      <NoteForm />
      <Subtitle1>Your Notes</Subtitle1>
      <div className={styles.notesCardContainer}>
        {notes.map((note) => (
          <div key={note.id} className={styles.noteCard}>
            <div className={styles.noteCardTop}>
              <Button appearance="transparent" onClick={() => handleDelete(note.id)}>X</Button>
            </div>
            <div>
              <p>{note.header}</p>
              <Divider />
              <p>{note.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}