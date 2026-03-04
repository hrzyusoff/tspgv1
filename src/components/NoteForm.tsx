import { useState, type FormEvent } from 'react'
import { useRouter } from '@tanstack/react-router'
import { Button, Input, makeStyles, useId } from '@fluentui/react-components'
import { addNote } from '@/serverActions/notesActions'

const useStyles = makeStyles({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'end',
    gap: '20px',
    '> div': { display: 'flex', flexDirection: 'column', gap: '2px' },
  },
  button: {
    alignSelf: 'end',
    width: '100%',
  }
})

export function NoteForm() {
  const styles = useStyles()
  const router = useRouter()
  const largeId = useId('input-large')

  const [header, setHeader] = useState('')
  const [body, setBody] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!header || !body || isSubmitting) {
      return
    }

    try {
      setError(null)
      setIsSubmitting(true)
      await addNote({ data: { header, body } })

      setHeader('')
      setBody('')

      await router.invalidate()
    } catch (err) {
      console.log('Error adding note:', err)
      setError('Failed to add note. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div>{error}</div>
      )}
      <div className={styles.formContainer}>
        <div>
          <Input size='large' id={largeId} value={header} onChange={e => setHeader(e.target.value)} placeholder='Note header'/>
        </div>
        <div>
          <Input size='large' id={largeId} value={body} onChange={e => setBody(e.target.value)} placeholder='Note body'/>
        </div>
        <div className={styles.button}>
          <Button type='submit' size='large' disabled={isSubmitting || !header || !body} appearance="primary">{isSubmitting ? 'Adding...' : 'Add Note'}</Button>
        </div>
      </div>
    </form>
  )
}