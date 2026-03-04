import { makeStyles, tokens } from '@fluentui/react-components'
import { useNavigate } from '@tanstack/react-router'

const useStyles = makeStyles({
  backNav: {
    cursor: 'pointer',
    '&:hover': {
      color: tokens.colorBrandBackground,
    }
  },
})

export function BackNav() {
  const navigate = useNavigate()
  const styles = useStyles()
  const icon = '<'
  return (
    <span
      className={styles.backNav}
      onClick={() =>
        navigate({
          to: '/'
        })
      }>{icon}
    </span>
  )
}