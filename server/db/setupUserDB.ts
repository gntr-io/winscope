import sqlite3 from 'sqlite3'
import path from 'path'

interface SetupUserDBParams {
  userId: string
}

export function setupUserDB({ userId }: SetupUserDBParams): void {
  const dbPath: string = path.join(__dirname, `../data/users/user_${userId}.db`)
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error(`Error opening user_you_app_${userId}.db:`, err)
  })

  db.serialize(() => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        userID TEXT UNIQUE,
        preferences TEXT
      )
    `,
      (err) => {
        console.log(
          err
            ? `Error creating users table: ${err}`
            : `Users table created or exists for user ${userId}`
        )
      }
    )
  })

  db.close((err) => {
    console.log(
      err
        ? `Error closing user_${userId}.db: ${err}`
        : `user_${userId}.db connection closed`
    )
  })
}

if (require.main === module) {
  setupUserDB({ userId: 'test_user' })
}
