# 🚀 Quick Reference - Firebase Gallery

## Firebase Console Links
- **Firebase Console**: https://console.firebase.google.com/
- **Firestore Database**: Project Settings > Build > Firestore Database
- **Storage**: Project Settings > Build > Storage
- **Security Rules**: Firestore/Storage > Rules tab

## Common Commands

```bash
# Start development server
npm run dev

# Install dependencies (if needed)
npm install

# Build for production
npm run build

# Start production server
npm start
```

## Admin Routes
- **Admin Dashboard**: http://localhost:3000/admin
- **Gallery Management**: http://localhost:3000/admin/gallery

## Public Routes
- **Gallery Page**: http://localhost:3000/gallery

## File Locations

| Purpose | File Path |
|---------|-----------|
| Firebase Config | `lib/firebase.ts` |
| Environment Variables | `.env.local` |
| Gallery Admin | `app/admin/gallery/page.tsx` |
| Public Gallery | `app/gallery/page.tsx` |
| Types | `types/gallery.ts` |

## Firebase Collections

| Collection | Purpose |
|------------|---------|
| `albums` | Stores album metadata (name, description, cover) |
| `photos` | Stores photo metadata (title, description, URL, location) |

## Firebase Storage Path
```
uploads/
  └── {albumName}/
      └── {timestamp}_{filename}
```

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Photos not loading | Check Firebase Storage rules & public read access |
| Upload fails | Verify Storage enabled & check browser console |
| Module not found | Run `npm install` and restart server |
| Firebase error | Check `.env.local` has correct credentials |

## Environment Variables Template

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## Testing Checklist

- [ ] Firebase project created
- [ ] Firestore enabled
- [ ] Storage enabled
- [ ] Security rules configured
- [ ] `.env.local` configured
- [ ] Can access admin panel
- [ ] Can create album
- [ ] Can upload photo
- [ ] Photo displays in gallery
- [ ] Can delete photo
- [ ] Can delete album

## Need Help?
- 📖 Full setup: See `FIREBASE_SETUP.md`
- 📚 Detailed guide: See `GALLERY_README.md`
- 🐛 Report issues: Check browser console for error messages
