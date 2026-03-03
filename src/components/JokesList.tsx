import type { Joke } from '@/types/jokes'
import { Card, Divider, makeStyles, Title2 } from '@fluentui/react-components'
import { JokeForm } from './JokeForm'

interface JokesListProps {
  jokes: Joke[]
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

export function JokesList({ jokes }: JokesListProps) {
  const styles = useStyles()

  if (!jokes || jokes.length === 0) {
    return <p>No jokes available.</p>
  }

  return (
    <div className={styles.container}>
      <Title2>Jokes Collection</Title2>
      <JokeForm />
      {jokes.map((joke) => (
        <Card key={joke.id} className={styles.card}>
          <p className={styles.cardTitle}>{joke.question}</p>
          <Divider />
          <p>{joke.answer}</p>
        </Card>
      ))}
    </div>
  )
}