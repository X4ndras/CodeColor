# Code: Color

Customizable colors for different syntax elements
Flexible syntax mapping system
Export and import themes as JSON

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/CodeColor.git
cd CodeColor

# Install dependencies
npm install

# Build for production
npm run build

# Start the development server
npm run dev
```

## Usage
1. Adjust colors in the color picker panel
2. See changes immediately in the code preview
3. Switch between programming languages to check how your theme looks
4. Map syntax elements to specific colors
5. Export your theme as JSON when finished

You can Import previously saved themes to continue editing.

## Theme Format
Themes are exported as JSON with this structure:
```json
{
  "colors": {
    "color0": "#1c1a1c",
    "color1": "#A64B3A",
    "bg0": "#282828",
    "fg0": "#ebdbb2",
    ...
  },
  "mappings": {
    "comment": "color8",
    "keyword": "color5",
    "string": "color2",
    "number": "color1",
    "variable": "color4",
    "fn": "color3",
    ...
  }
}
```

## Development
Available Scripts:
```bash
npm run build # Build project
npm run dev # Start development server
npm run preview # Preview the production build
npm run check # Type-check the codebase
```
