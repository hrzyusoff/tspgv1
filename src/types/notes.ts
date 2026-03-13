export interface Note {
  id: string
  header: string
  body: string
  createdAt: string
}

export type NotesData = Note[]