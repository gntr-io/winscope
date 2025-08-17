import sqlite3 from 'sqlite3'
import path from 'path'

const dbPath: string = path.join(__dirname, '../data/history.db')
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Error opening history.db:', err)
})

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS league_season_averages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      league TEXT,
      season TEXT,
      home_team_win INT,
      draw INT,
      away_team_win INT
    )
  `,
    (err) => {
      console.log(
        err
          ? `Error creating league_season_averages table: ${err}`
          : 'League Season Averages table created or exists'
      )
    }
  )
})

db.close((err) => {
  console.log(
    err ? `Error closing history.db: ${err}` : 'history.db connection closed'
  )
})
