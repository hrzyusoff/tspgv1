import type { Note } from '@/types/notes'
import { Body2, Button, Caption1, Divider, Label, makeStyles, Subtitle1, Subtitle2, Title2 } from '@fluentui/react-components'
import { NoteForm } from './NoteForm'
import { deleteNote } from '@/serverActions/notesActions'
import { useRouter } from '@tanstack/react-router'
import { BackNav } from './BackNav'
import { useState } from 'react'
import { Pagination } from './Pagination'

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
    height: "450px"
  },
  noteCard: {
    border: "4px solid",
    padding: "8px 16px 16px 16px",
  },
  noteCardTop: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "-8px",
    "& Button": {
      minWidth: "24px",
      padding: "0",
    },
    "& Button:hover": {
      color: "#E84641",
    },
  },
  noteCardBottom: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
})

export function NotesList({ notes }: NotesListProps) {
  const styles = useStyles()
  const router = useRouter()

  if (!notes || notes.length === 0) {
    return <p>No notes available.</p>
  }

  // It's generally better to sort in the UI (here) if you want flexibility in presentation.
  // If you always want notes sorted from the backend, sort in notesActions.
  // For this component, sorting here is fine:
  const sortedNotes = [...notes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

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

  const [page, setPage] = useState(1)
  const noItemsPerPage = 6
  const totalPages = Math.ceil(sortedNotes.length / noItemsPerPage)
  const paginatedNotes = sortedNotes.slice((page-1)*noItemsPerPage, page*noItemsPerPage)

  return (
    <div className={styles.container}>
      <Title2><BackNav /> Notes Collection</Title2>
      <Label>This page implements note collection by reading and writing a file method.</Label>
      <Subtitle1>Jot Down Your Notes Here</Subtitle1>
      <NoteForm />
      <Subtitle1>Your Notes</Subtitle1>
      <div className={styles.notesCardContainer}>
        {paginatedNotes.map((note) => (
          <div key={note.id} className={styles.noteCard}>
            <div className={styles.noteCardTop}>
              <Button appearance="transparent" onClick={() => handleDelete(note.id)}>X</Button>
            </div>
            <div className={styles.noteCardBottom}>
              <Subtitle2>{note.header}</Subtitle2>
              <Body2>{note.body}</Body2>
              <Caption1>Created At: {new Date(note.createdAt).toLocaleString()}</Caption1>
            </div>
          </div>
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  )
}