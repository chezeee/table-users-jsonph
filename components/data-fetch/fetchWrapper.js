export async function fetchWrapper(path) {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com' + path
  );
  if (!response.ok) {
    throw new Error('fetch ' + response.status);
  }

  return await response.json();
}
