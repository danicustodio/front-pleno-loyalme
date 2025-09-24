export function createMockFetchResponse<T>(
  data: T,
  options: { ok?: boolean; status?: number } = {}
) {
  return Promise.resolve({
    ok: options.ok ?? true,
    status: options.status ?? 200,
    json: () => Promise.resolve(data),
  })
}
