find content/posts -type f -name "*.md" | while read -r file; do
    if grep -q "unlisted: true" "$file"; then
        echo "Error: unlisted posts found. Please publish or move to private before pushing to upstream."
        echo "-----------------------------------"
        echo "===> $file"
        echo "-----------------------------------"
        exit 1
    fi
done
git pull upstream main
git add -A
git commit -m "Sync downstream $(date '+%d/%m/%Y %H:%M:%S')"
git push upstream main