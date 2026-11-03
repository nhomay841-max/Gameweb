# Publish SWEETIE

The site is static and deploys to GitHub Pages. Supabase provides email/password
accounts and private, per-player cloud saves. Never put a Supabase `service_role`
or secret key in this website.

## 1. Configure Supabase

1. Create a Supabase project.
2. In the SQL Editor, run [`supabase/schema.sql`](./supabase/schema.sql).
3. Copy the project URL and its publishable key (or legacy `anon` key) into
   `supabase-config.js`.
4. In Authentication settings, set the Site URL to the eventual Pages address
   and add that address to the allowed redirect URLs. For a project repository,
   include the full path, for example
   `https://nhomay841-max.github.io/sweetie/`.
5. Email confirmation can remain enabled. New players must confirm their email
   before signing in.

The browser key is public by design. Row-level security in the SQL schema
restricts each player to their own save.

## 2. Publish on GitHub Pages

1. Create a **public** repository under `nhomay841-max` and upload these files
   and folders to its `main` branch.
2. In the repository, open **Settings → Pages** and select **GitHub Actions**
   as the build and deployment source.
3. The included workflow deploys on each push to `main`. The address is
   `https://nhomay841-max.github.io/<repository-name>/`.

The root address `https://tiembanhnho.github.io/` belongs to a GitHub account
named `tiembanhnho`, so it cannot be used as the default Pages address for
`nhomay841-max`. A separately registered domain can be connected in GitHub Pages
settings if desired.

## Saves and privacy

Existing browser progress is imported into the first account that signs in on
that browser when the account has no cloud save yet. Subsequent saves are scoped
to the signed-in user and sync to Supabase. Do not share the Supabase secret or
service-role key; only the publishable/anon key belongs in `supabase-config.js`.
