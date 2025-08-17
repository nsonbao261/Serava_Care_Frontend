export function ToInstant(ddmmyyyy: string): string {
  const [dd, mm, yyyy] = ddmmyyyy.split("-");
  const isoWithTz = `${yyyy}-${mm}-${dd}T00:00:00+07:00`; // VN GMT+7
  return new Date(isoWithTz).toISOString();               // -> 2002-03-04T00:00:00.000Z
}

/** Nếu form lưu ISO (DatePicker trả về) -> cắt còn yyyy-MM-dd rồi convert */
export function ISODateOnlyToInstant(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-");
  const isoWithTz = `${y}-${m}-${d}T00:00:00+07:00`;
  return new Date(isoWithTz).toISOString();
}