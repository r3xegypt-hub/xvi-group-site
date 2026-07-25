import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync('C:\\Users\\stone\\.local\\share\\mimocode\\mimocode.db', { readOnly: true });

const query = process.argv[2] || 'SELECT 1';
console.log('Query:', query);
console.log('---');
const rows = db.prepare(query).all();
console.log(JSON.stringify(rows, null, 2));
console.log('---');
console.log('Rows:', rows.length);
db.close();
