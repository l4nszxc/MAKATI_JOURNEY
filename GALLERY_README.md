# 📸 Travel Gallery Management System

A complete photo gallery management system built with Next.js and Firebase, allowing you to manage albums and photos through an admin interface.

## ✨ Features

### For Admins
- **Album Management**: Create and delete photo albums
- **Photo Upload**: Upload photos with titles, descriptions, and locations
- **Organized Storage**: Photos automatically organized in Firebase Storage by album
- **Easy Management**: Intuitive admin interface for managing your gallery

### For Visitors
- **Beautiful Gallery**: Responsive grid layout showcasing your photos
- **Album Filtering**: Filter photos by album or view all
- **Photo Details**: View titles, descriptions, and locations for each photo
- **Fast Loading**: Optimized with Firebase CDN

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Firebase
Follow the detailed instructions in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

### 3. Configure Environment Variables
Copy `.env.local` and add your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 4. Run the Development Server
```bash
npm run dev
```

### 5. Access the Admin Panel
1. Navigate to your site
2. Log in to the admin panel
3. Click "Manage Gallery" in Quick Actions
4. Start creating albums and uploading photos!

## 📁 Project Structure

```
app/
├── admin/
│   ├── gallery/
│   │   └── page.tsx          # Gallery management interface
│   ├── layout.tsx             # Admin layout
│   └── page.tsx               # Admin dashboard
├── gallery/
│   └── page.tsx               # Public gallery page
lib/
└── firebase.ts                # Firebase configuration
types/
└── gallery.ts                 # TypeScript types for Album and Photo
```

## 🗄️ Data Structure

### Album
```typescript
{
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  coverPhotoUrl?: string;
}
```

### Photo
```typescript
{
  id: string;
  albumId: string;
  title: string;
  description: string;
  imageUrl: string;
  uploadedAt: Date;
  location?: string;
}
```

## 📂 Firebase Storage Structure

Images are organized in Firebase Storage with the following structure:
```
uploads/
  ├── Makati_Adventures/
  │   ├── 1738694400000_sunset.jpg
  │   └── 1738694500000_skyline.jpg
  ├── Food_Trip/
  │   └── 1738694600000_restaurant.jpg
```

Each file is named with a timestamp and sanitized filename to prevent conflicts.

## 🎨 Using the Gallery

### Creating an Album
1. Go to Admin > Manage Gallery
2. Click "Create Album"
3. Enter album name and description
4. Click "Create Album"

### Uploading Photos
1. Find the album in the Albums section
2. Click "Add Photo" on the album card
3. Fill in photo details:
   - Select the album (pre-selected if clicked from album)
   - Photo title (required)
   - Description (optional)
   - Location (optional)
   - Select image file (required)
4. Click "Upload Photo"

### Deleting Content
- **Delete Album**: Removes the album and all its photos from both Firestore and Storage
- **Delete Photo**: Removes the photo from both Firestore and Storage

## 🔐 Security Considerations

The current setup uses basic security rules. For production:

1. **Implement Authentication**
   - Add Firebase Authentication
   - Require login for admin operations
   
2. **Update Security Rules**
   - Restrict write access to authenticated admins only
   - Keep read access public for gallery viewing

3. **Add Validation**
   - File type validation (images only)
   - File size limits
   - Sanitize user input

## 🎯 Future Enhancements

- [ ] Image compression before upload
- [ ] Drag-and-drop upload
- [ ] Bulk upload multiple photos
- [ ] Image editing/cropping
- [ ] Album reordering
- [ ] Photo captions and tags
- [ ] Search functionality
- [ ] Lightbox/modal view for photos
- [ ] Social sharing
- [ ] Download photos

## 🐛 Troubleshooting

### Photos not appearing
- Check Firebase console to verify photos are uploaded
- Verify Firebase Storage rules allow public read access
- Check browser console for errors

### Upload fails
- Verify Firebase Storage is enabled
- Check file size and type
- Review Firebase Storage rules
- Check browser console for detailed errors

### "Cannot find module" errors
- Run `npm install` to ensure all dependencies are installed
- Restart your development server

## 📝 License

This project is part of a personal portfolio website.

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome!
