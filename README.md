# [<img src="/public/citu-eteeap-logo.svg" alt="Logo Dark Mode" width="32" height="32"> CIT-U ETEEAP](https://citu-eteeap.vercel.app/)

By KARS Stack

## Services Used

### Backend

- User Authentication: [Clerk](https://dashboard.clerk.com/)
- Database Management: [Firebase Firestore](https://firebase.google.com/docs/firestore/)

### Frontend

- User Interface Theme: [next-themes](https://www.npmjs.com/package/next-themes)
- User Interface Components: [shadcn-ui](https://ui.shadcn.com/), [sonner](https://sonner.emilkowal.ski/), & [react-datetime-picker](https://www.npmjs.com/package/react-datetime-picker)
- Icon Pack: [lucide-react](https://www.npmjs.com/package/lucide-react)

## .env.local

```env
# CLERK DEVELOPMENT INSTANCE
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# FIREBASE WEB APP
# Can be obtained at:
# 1. https://console.firebase.google.com
# 2. Click into your project or create new if you don't have one yet. Note: This configuration has Google Analytics turned on.
# 3. Project Overview > Project Settings > General
# 4. Your apps > SDK setup and configuration

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

## Running Locally

1. Clone this repository into your machine.

2. Run this code in your terminal to install all dependencies used in this project.

```shell
npm install
```

3. Fill in all the necessary variables in the `.env.local` outlined above.

4. Build and run your web app at `http://localhost:3000` by running the code below in the terminal.

```shell
npm run dev
```

## References

- [shadcn-ui-sidebar](https://github.com/salimi-my/shadcn-ui-sidebar)
