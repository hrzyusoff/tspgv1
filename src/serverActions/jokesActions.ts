import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'
import { v4 as uuidv4 } from 'uuid'
import type { JokesData } from '@/types/jokes'

const JOKES_FILE = 'src/data/jokes.json'

export const getJokes = createServerFn({ method: 'GET' }).handler(async () => {
  const jokes = await fs.promises.readFile(JOKES_FILE, 'utf-8')
  return JSON.parse(jokes) as JokesData
})

export const addJoke = createServerFn({ method: 'POST' })
  .inputValidator((data: { question: string; answer: string }) => {
    if (!data.question || !data.question.trim()) {
      throw new Error('Question is required')
    }
    if (!data.answer || !data.answer.trim()) {
      throw new Error('Answer is required')
    }

    return data
  })
  .handler(async ({ data }) => {
    try {
      const jokes = await getJokes()
      const newJoke = {
        id: uuidv4(),
        question: data.question,
        answer: data.answer,
      }
      const updatedJokes = [...jokes, newJoke]
      await fs.promises.writeFile(JOKES_FILE, JSON.stringify(updatedJokes, null, 2), 'utf-8')
      return newJoke
    } catch (error) {
      console.error('Error adding joke:', error)
      throw new Error('Failed to add joke')
    }
  })