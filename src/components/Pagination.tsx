import type { Note } from '@/types/notes'
import { Button, makeStyles, tokens } from '@fluentui/react-components'
import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'

const useStyles = makeStyles({
  paginationContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  paginationButton: {
  },
  activePageButton: {
    color: tokens.colorBrandBackground,
  },
  buttonSpacer: {
    margin: '0 9px',
  },
})

{/* Pagination Format - Prev, ..., 2,3,4, ... , Next */}
export function Pagination({ totalPages, page, setPage }: { page: number, totalPages: number, setPage: (page: number) => void }) {
  const styles = useStyles()

  return (
    <div className={styles.paginationContainer}>
      <div>
        {`Page ${page} of ${totalPages}`}
      </div>
      <div>
        <Button shape="square" className={styles.paginationButton} disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
        {page > 2 && (
          <>
            <Button shape="square"className={styles.paginationButton} onClick={() => setPage(1)}>1</Button>
            {page > 3 && <span className={styles.buttonSpacer}>...</span>}
          </>
        )}
        {Array.from({ length: 3 }, (_, i) => {
          const pageNumber = page - 1 + i
          if (pageNumber < 1 || pageNumber > totalPages) return null
          return (
            <Button
              shape="square"
              key={pageNumber}
              className={pageNumber === page ? `${styles.activePageButton} ${styles.paginationButton}` : undefined}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </Button>
          )
        })}
        {page < totalPages - 1 && (
          <>
            {page < totalPages - 2 && <span className={styles.buttonSpacer}>...</span>}
            <Button shape="square" className={styles.paginationButton} onClick={() => setPage(totalPages)}>{totalPages}</Button>
          </>
        )}
        <Button shape="square" className={styles.paginationButton} disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </div>
  )
}