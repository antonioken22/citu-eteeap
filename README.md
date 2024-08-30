# CIT-U ETEEAP

By KARS Stack

## Services Used

### Backend

- User Authentication: Clerk

### Frontend

- User Interface Theme: [next-themes](https://www.npmjs.com/package/next-themes)
- User Interface Components: [shadcn-ui](https://ui.shadcn.com/), [sonner](https://sonner.emilkowal.ski/), & [react-datetime-picker](https://www.npmjs.com/package/react-datetime-picker)
- Icon Pack: [lucide-react](https://www.npmjs.com/package/lucide-react)

## .env.local

```env
# Clerk Development Instance
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

## Running Locally

1. Clone this repository into your machine.

2. Run this code in your terminal to install all dependencies used in this project.

```shell
npm install
```

3. Fill in all the necessary variables in the `.env.local` outlined above. You can obtain these keys by watching the video from the playlist linked in the References below.

4. Build and run your web app at `http://localhost:3000` by running the code below in the terminal.

```shell
npm run dev
```

## References

- [shadcn-ui-sidebar](https://github.com/salimi-my/shadcn-ui-sidebar)
