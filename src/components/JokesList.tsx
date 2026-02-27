import type { Joke } from '@/types/jokes'

interface JokesListProps {
  jokes: Joke[]
}

export function JokesList({ jokes }: JokesListProps) {
  if (!jokes || jokes.length === 0) {
    return <p>No jokes available.</p>
  }

  return (
    <div>
      <h2>Jokes Collection</h2>
      {jokes.map((joke) => (
        <div key={joke.id} style={{ marginBottom: '1rem' }}>
          <p>{joke.question}</p>
          <p>{joke.answer}</p>
        </div>
      ))}
    </div>
  )
}