import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { Button, Input, makeStyles, useId } from '@fluentui/react-components'
import { addJoke } from '@/serverActions/jokesActions'

const useStyles = makeStyles({
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'end',
    gap: '20px',
    '> div': { display: 'flex', flexDirection: 'column', gap: '2px' },
  },
  button: {
    alignSelf: 'end',
    width: '100%',
  }
})

export function JokeForm() {
  const styles = useStyles()
  const router = useRouter()
  const largeId = useId('input-large')

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!question || !answer || isSubmitting) {
      return
    }

    try {
      setIsSubmitting(true)
      await addJoke({ data: { question, answer } })

      setQuestion('')
      setAnswer('')

      router.invalidate()
    } catch (err) {
      console.log('Error adding joke:', err)
      setError('Failed to add joke. Please try again.')
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
          <Input size='large' id={largeId} value={question} onChange={e => setQuestion(e.target.value)} placeholder='Enter joke question'/>
        </div>
        <div>
          <Input size='large' id={largeId} value={answer} onChange={e => setAnswer(e.target.value)} placeholder='Enter joke answer'/>
        </div>
        <div className={styles.button}>
          <Button type='submit' size='large' disabled={isSubmitting || !question || !answer} appearance="primary">{isSubmitting ? 'Adding...' : 'Add Joke'}</Button>
        </div>
      </div>
    </form>
  )
}