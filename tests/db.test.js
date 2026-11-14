const { createPool } = require('../src/db');

// Runs only when DB_HOST is set (in CI it points to the postgres service container).
const describeIfDb = process.env.DB_HOST ? describe : describe.skip;

describeIfDb('PostgreSQL connection', () => {
  let pool;

  beforeAll(() => {
    pool = createPool();
  });

  afterAll(async () => {
    await pool.end();
  });

  test('SELECT 1 returns 1', async () => {
    const { rows } = await pool.query('SELECT 1 AS value');
    expect(rows[0].value).toBe(1);
  });
});
