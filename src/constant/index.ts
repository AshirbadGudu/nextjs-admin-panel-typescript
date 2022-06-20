import admin from 'firebase-admin'

admin.apps.length === 0 &&
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDRN+a2CK4pchnm\niCzY2fuvGQYIrgaD4fDDOZz/TF0AWI75mks+oXLkabKhpqO2hKvkBotlAblBNPv8\nMg7IpAa64JnLntLYwoiRhMyRdmVhhHJDLfL1e3PXw0TMlZFwEPnnR0HYkQarGt3Q\ni4paK/wO/6ZIxGhShMpVtp9bTUq/T4cn3/bydvCQqARLiDQLRS/TdPqEvC1NIDI/\nxDVVeL1WT6KqbStdiS9bMA8dgJNdzq0whVHdDmH+YvHfaRRqnb/0V5+Rr2hlu040\n41UKQ5V8FzE+Sg9Kbbt9vv5cK0hzGQ4ILeK4MxlodZyppvu7FDnwDiumG4zXjZZ1\nTFRVbkBzAgMBAAECggEAJDP8p747yO82HSauP/4EZ8m4OhNHDFYyD84t5R2FMFSi\ntP1mjNlqJK1HnGJWDPTLO8OIJnvUXzy4Z+0PkteTVI4d/tamXJzY/flRXtByfZvq\nG8bdNm5c3taq1o4BIzfEzqkNc1ixIzWccYRb9fuLe9rwHsJh3Pmee5OE4ssupojf\nyYZmEe/EqqYv0eAdAwC8CaX2GSuo28PKgJl3KZ5o/tPXUC8RGEzr+sIVjzQQkuru\nIBxGezUd+Nvq0xQOfHh8zL1EuAMftxaLhPKjzsZXfEnHrKIj740D4h8gUuMzlPfv\ntPCAUhkqWx6XL6WwFL4Cuax9TuyX70BM9EKF1UkO+QKBgQDx7Vq8XkpRbNMbb91l\nC+PnvZSgyN8qpnuhG8MZ7hi+aes/SSCfAdNJxMfk1l7k78tPB5r9FzWoDle/Ti3c\nQ6Sz3YlfUXcLAgeQOAJ23sSLgkkws1j0XmbRoZl7YN3EAICStg+aOJ4GLJLMcD7y\nRj6XmgCmCPuGZUH4OvlC3ygo2QKBgQDdY3cj+YYUdW22pBGuQF1ow495RylSK1/V\noewvtQn/aifGIRn0KAQKo3ywYh2t9MHM/z7+ImXJdTLg30t1uNuPPRnReV6lJbVJ\nOWJhU5hzjSCuGsanPMZxmvmsm5PNVcp03g+U6LLCy+XU1dL/nZ+jUF7g/r+XqC92\ntfOIeewEKwKBgQDehlz0cKJZPQj87qssu4AY83cXYUxsVY/Xw8p0Ol4GHzTkFCZu\nO2aWLutSoJ/OYoaWHb/A1i1jdDXf4FAsjwea7cXip/Mga/B7Bhm2LveH/wHFSuIi\nfAaFAehD5Ph2xaN9zvqQ90zbDvrEEubDQDtohJ3eGtsIZnEEm3IUwWCWGQKBgFAE\nLkCTZDGqy6+yly1a2CgQXp/f54BqauXk81++2FE3hg6nUiEcAXHy6xM5My73gsBc\nFOF3f0CUGoKKUlTHLpwT4mwCqQGZom9HzVYOB9Dj1kb3KIuzfKn88HbBeGdDtbwN\nsqYIgOvFFFmbuvpmdxdo6hH6ITdoM1d9pfrSzkonAoGAOOGOve8BIMtoyiLZRbdV\nbsqnZ7RXhuHfwHWENc7pGXXcd8bcLbVoz2PnJpzW1BWeyMjceEdS2Y8EpT2C2pPC\nQqK8ikdOzLe8sYBUvEd2ZbF+w0PuoWDuNxfSOVTEbpQKNiS2e/QuN8MPgTd2zhGG\n/d+97aJCvMCLGOKLtLXVlzs=\n-----END PRIVATE KEY-----\n',
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  })

export { admin }
