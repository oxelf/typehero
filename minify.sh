#!/bin/sh

# Delete all existing .min.js, .min.html, and .min.css files
find . -type f \( -name "*.min.js" -o -name "*.min.html" -o -name "*.min.css" \) -exec rm {} \;
echo "Deleted all existing .min.* files."

# Find and minify all .js, .html, and .css files
find . -type f \( -name "*.js" -o -name "*.html" -o -name "*.css" \) | while read file; do
  # Extract directory and base name
  dir=$(dirname "$file")
  base=$(basename "$file")
  
  # Construct the minified file name
  output="$dir/$(basename "$base" .${base##*.}).min.${base##*.}"

  # Minify the file
  minify -o "$output" "$file" && echo "Minified $file to $output"
done