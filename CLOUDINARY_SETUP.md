# Cloudinary Setup Guide for Nava Art Gallery

## 📁 Folder Structure

Create this exact folder structure in your Cloudinary account:

```
nava-co-il/
├── paintings/
│   ├── artwork1.jpg
│   ├── artwork2.jpg
│   └── artwork3.jpg
└── sculptures/
    ├── abstract-piece1.jpg
    ├── human-figure1.jpg
    ├── geometric-form1.jpg
    └── figurative-sculpture1.jpg
```

## 🏷️ Metadata for Each Image

### For Paintings:
```json
Context (Key-Value pairs):
{
  "title": "Sunset Over Mountains",
  "description": "Oil painting depicting a vibrant sunset",
  "medium": "Oil on canvas",
  "year": "2024",
  "dimensions": "24x36 inches"
}

Tags: ["landscape", "oil", "nature"]
```

### For Sculptures:
```json
Context (Key-Value pairs):
{
  "title": "Abstract Flow",
  "description": "Flowing forms exploring movement and space",
  "medium": "Bronze",
  "year": "2023",
  "dimensions": "18x12x8 inches"
}

Tags: ["abstract", "bronze"] 
// OR
Tags: ["human-body", "ceramic"]
// OR 
Tags: ["geometric", "stone"]
```

## 🎯 Required Tags for Sculpture Categories:

- `abstract` - For abstract sculptures
- `human-body` - For human figure sculptures  
- `geometric` - For geometric forms
- `figurative` - For figurative works

## 📝 How Your Parents Can Add Content:

1. **Log into Cloudinary Dashboard**
2. **Navigate to Media Library**
3. **Create/Select folder**: `nava-co-il/paintings` or `nava-co-il/sculptures`
4. **Upload images**: Drag & drop files
5. **Add metadata for each image**:
   - Click on uploaded image
   - Go to "Details" tab
   - Add Context data (title, description, medium, year, dimensions)
   - Add Tags (especially important for sculptures: abstract, human-body, etc.)

## 🔧 Environment Variables:

Create `.env.local` file with your Cloudinary credentials:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key  
CLOUDINARY_API_SECRET=your-api-secret
```

## 📱 User Experience:

### Main Gallery Page:
- Shows "Paintings" and "Sculptures" cards

### Paintings Page:
- Simple grid of all paintings
- No subcategories

### Sculptures Page:  
- Shows subcategory buttons: "Abstract", "Human Body", "Geometric", etc.
- Click button to filter sculptures by that category
- Shows all sculptures by default

### Individual Artwork:
- Full-size image with details (title, description, medium, year, dimensions)
- Navigation between pieces in same category