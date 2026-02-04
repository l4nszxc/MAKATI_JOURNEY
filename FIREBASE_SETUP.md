# Firebase Setup Instructions

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

## Step 2: Enable Firestore Database

1. In the Firebase Console, go to **Build** > **Firestore Database**
2. Click **Create database**
3. Select **Start in test mode** (for development)
4. Choose a location for your database
5. Click **Enable**

**Note:** We're only using Firestore for the database. Images are stored locally in your `public/uploads` folder.

## Step 3: Set Up Firestore Security Rules

Go to **Firestore Database** > **Rules** and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all users
    match /{document=**} {
      allow read: if true;
    }
    
    // Only allow write access to authenticated admin (you can enhance this)
    match /albums/{albumId} {
      allow write: if true; // TODO: Add authentication
    }
    
    match /photos/{photoId} {
      allow write: if true; // TODO: Add authentication
    }
  }
}
```

### Storage Security Rules
Go
1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click the **Web** icon (`</>`) to add a web app
4. Register your app with a nickname (e.g., "My Travel Gallery")
5. Copy the `firebaseConfig` object

## Step 5: Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Step 6: Start Your Development Server

```bash
npm run dev
```

## Step 7: Test the Setup

1. Navigate to the admin panel (you need to log in first)
2. Go to "Manage Gallery"
3. Create a new album
4. Upload a photo to the album
5. Visit the gallery page to see your photos!

## Folder Structure for Uploaded Images

Firebase Storage will organize your images like this:
```
uploads/
  ├── Album_Name_1/
  │   ├── timestamp_photo1.jpg
  │   └── timestamp_photo2.jpg
  ├── Album_Name_2/
  │   └── timestamp_photo3.jpg
```

## Important Notes

⚠️ **Security Warning**: The current setup allows anyone to read and write data. For production:
1. Implement Firebase Authentication
2. Update security rules to require authentication
Images are stored locally in your project:
4. Add file upload validation and size limits

🔒 **Never commit `.env.local`** to version control - it contains sensitive credentials!

📁 **Backup Your Images**: Since images are stored locally in `public/uploads`, make sure to:
- Include this folder in your backup strategy
- Consider using `.gitignore` to exclin Firebase Console

### Images not displaying
- Check that images exist in `public/uploads` folder
- Verify the image path in Firestore is correct (should start with `/uploads/`)
- Check browser console for 404 errors

### "Permission denied" errors
- Review your Firestore security rules
- Make sure rules are published (click "Publish" in Rules tab)

### Upload fails
- Check that the `public` folder has write permissions
- Verify file size isn't too large
- Check browser console for detailed errors
The database (Firestore) only stores:
- Album information (name, description, cover photo path)
- Photo metadata (title, description, location, local file path)
### Images not displaying
- Check Firebase Storage rules allow read access
- Verify the image URL in Firestore is correct
- Check browser console for CORS errors

### "Permission denied" errors
- Review your Firestore and Storage security rules
- Make sure rules are published (click "Publish" in Rules tab)

## Next Steps

1. ✅ Set up Firebase Authentication (optional but recommended)
2. ✅ Add image compression before upload
3. ✅ Implement pagination for large galleries
4. ✅ Add image editing/cropping features
5. ✅ Set up automatic backups
