import { createServerFn } from '@tanstack/react-start'

const API_URL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json'

export const getUsers = createServerFn({ method: 'GET' }).handler(async () => {
  const request = new Request(API_URL)
  const response = await fetch(request)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`)
  }

  return response.json()
})