import { getNotes } from '@/serverActions/notesActions'
import { Body1, makeStyles, Subtitle2Stronger, Title2 } from '@fluentui/react-components'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

// TODO: Redundant with the one in the NotesList.tsx, move to a shared file
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
}

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 18px)',
  },
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
  routesCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '12px',
    cursor: 'pointer',
    border: "4px solid",
    ":hover": {
      backgroundColor: "#FF5640",
    },
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: "8px",
  },
})

export const Route = createFileRoute('/')({
  loader: async () => {
    return getNotes()
  },
  component: App
})

function App() {
  const styles = useStyles()
  const navigate = useNavigate()
  const routes = [
    { name: 'Notes', path: '/notes', title: 'Notes', description: 'Created by Reading & Writing a File' },
    { name: 'Users', path: '/users', title: 'Users', description: 'Created by Fetching Users from API' },
  ]

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <Title2>TanStack with FluentUI</Title2>
        {routes.map(route => (
          <div
            className={styles.routesCardContainer}
            onClick={() =>
              navigate({
                to: route.path
              })
            }
          >
            <Subtitle2Stronger>{route.title}</Subtitle2Stronger>
            <Body1>{route.description}</Body1>
          </div>
        ))}
      </div>
    </div>
  )
}
