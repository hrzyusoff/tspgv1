import { Label, makeStyles, Persona, Title2 } from '@fluentui/react-components'
import { useState } from 'react'
import { BackNav } from './BackNav'

// TODO: Update this interface based on the actual user data structure
interface UsersListProps {
  users: any
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
    paddingTop: '10%',
    margin: '0 auto 16px',
    [`@media (min-width: ${breakpoints.sm})`]: { width: '540px' }, // sm
    [`@media (min-width: ${breakpoints.md})`]: { width: '720px' }, // md
    [`@media (min-width: ${breakpoints.lg})`]: { width: '900px' }, // lg
  },
  memberCardHeader: {
    display: 'flex',
    flexDirection: 'column',
  },
  memberCardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  },
  memberCard: {
    border: "4px solid",
    padding: "16px",
  },
})

export function UsersList({ users }: UsersListProps) {
  const styles = useStyles()
  const { members } = users

  if (!users || users.length === 0) {
    return <p>No users available.</p>
  }

  const newMembers = [{
    age: 100,
    name: "Test User",
    status: "available",
    powers: ["Testing", "Debugging", "Coding", "Designing"],
    secretIdentity: "Test Secret Identity"
  }, {
    age: 200,
    name: "Another User",
    status: "away",
    powers: ["Coding", "Designing", "Project Management", "Leadership"],
    secretIdentity: "Another Secret Identity"
  }, {
    age: 300,
    name: "Third User",
    status: "offline",
    powers: ["Testing", "Debugging", "Designing", "Project Management"],
    secretIdentity: "Third Secret Identity"
  }]
  const latestMembers = [...members, ...newMembers]
  const [ status, setStatus ] = useState("offline")
  
  return (
    <div className={styles.container}>
        <div className={styles.memberCardHeader}>
          <Title2><BackNav /> Users Collection</Title2>
          <Label>This page implements user collection by fetching users from an API (JSON).</Label>
        </div>
        <div className={styles.memberCardContainer}>
          {latestMembers.map((member: any) => (
          <Persona
            key={member.name}
            className={styles.memberCard}
            textAlignment="start"
            name={member.secretIdentity}
            size="extra-large"
            presence={{ status: member.status ? member.status : status }}
            secondaryText={member.name}
            tertiaryText={member.age}
            quaternaryText={member.powers.join(', ')}
          />))
          }
        </div>
    </div>
  )
}