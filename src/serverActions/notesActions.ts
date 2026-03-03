import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'
import { v4 as uuidv4 } from 'uuid'
import type { NotesData } from '@/types/notes'

const JOKES_FILE = 'src/data/notes.json'

export const getNotes = createServerFn({ method: 'GET' }).handler(async () => {
  const notes = await fs.promises.readFile(JOKES_FILE, 'utf-8')
  return JSON.parse(notes) as NotesData
})

export const addNote = createServerFn({ method: 'POST' })
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
      const notes = await getNotes()
      const newNote = {
        id: uuidv4(),
        question: data.question,
        answer: data.answer,
      }
      const updatedNotes = [...notes, newNote]
      await fs.promises.writeFile(JOKES_FILE, JSON.stringify(updatedNotes, null, 2), 'utf-8')
      return newNote
    } catch (error) {
      console.error('Error adding note:', error)
      throw new Error('Failed to add note')
    }
  })