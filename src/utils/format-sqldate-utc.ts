export function formatSQLDateUTC(timestamp: number): string {
  const d = new Date(timestamp);
  return d.toISOString().replace('T', ' ').substring(0, 19);
}
