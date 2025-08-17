import sqlite3 from 'sqlite3'
import path from 'path'

const dbPath: string = path.join(__dirname, '../data/history.db')
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Error opening history.db:', err)
})

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS matches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      league TEXT,
      season TEXT,
      home_team TEXT,
      away_team TEXT,
      result TEXT
    )
  `,
    (err) => {
      console.log(
        err
          ? `Error creating matches table: ${err}`
          : 'Matches table created or exists'
      )
    }
  )
})

db.close((err) => {
  console.log(
    err ? `Error closing history.db: ${err}` : 'history.db connection closed'
  )
})
