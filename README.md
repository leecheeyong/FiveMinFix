<img src="/public/logo.png" height="120">

# [FiveMinFix](https://fiveminfix.vercel.app)

Beat procrastination, one 5-minute task at a time!

## Features

- User authentication (sign up/sign in)
- Add, manage, and complete 5-minute tasks
- Random task recommender
- XP and level system
- Daily streak tracking
- Progress stats dashboard

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/leecheeyong/FiveMinFix.git
   cd FiveMinFix
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure Firebase:**
   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Enable **Authentication** (Email/Password).
   - Set up **Cloud Firestore** in test mode (or with secured rules).
   - Edit the `src/firebase.js` file, replace with your Firebase credentials

## Contributing

Contributions are welcome! Please [open issues](https://github.com/leecheeyong/FiveMinFix/issues) or [pull requests](https://github.com/leecheeyong/FiveMinFix/pulls) for improvements and bug fixes.

## License

FiveMinFix is available as open source under the terms of the [MIT License](https://github.com/leecheeyong/FiveMinFix/blob/main/LICENSE).
