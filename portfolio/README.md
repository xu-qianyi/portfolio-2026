This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Run the dev server

**Recommended:** run from a normal terminal (not inside Cursor’s integrated terminal if you’ve had issues):

```bash
cd portfolio
npm run dev
```

- **Faster startup (Turbopack):** `npm run dev:fast`
- **Stable (Webpack):** `npm run dev` (default)

Open [http://localhost:3000](http://localhost:3000) or [http://127.0.0.1:3000](http://127.0.0.1:3000) in your browser.

### If localhost:3000 won’t open or is slow

1. **Run `npm run dev` in your own terminal** (e.g. Terminal.app or iTerm). Running it from inside Cursor can trigger a Node/OS error (`uv_interface_addresses`) in some setups; using a normal terminal avoids that.
2. **Port 3000 already in use?** Free it, then start again:
   ```bash
   npm run free-port   # kills any process on port 3000
   npm run dev
   ```
   Or manually: `lsof -i :3000`, then `kill <PID>`.
3. **First load is slow** — Next.js compiles on first request; give it 10–20 seconds then refresh.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
