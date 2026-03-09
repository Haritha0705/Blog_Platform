const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/api/v1';

export async function uploadImage(
  file: File,
  folder: string = 'uploads',
): Promise<{ url: string; key: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('blog_token')
      : null;

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/upload?folder=${folder}`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });
  } catch {
    throw new Error(
      'Network error: Unable to reach the server. Please check your connection.',
    );
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      err.message || `Upload failed with status ${res.status}`,
    );
  }

  const data = await res.json();
  return { url: data.url, key: data.key };
}

