unlistedFiles=0
find content/posts -type f -name "*.md" | while read -r file; do
    if grep -q "unlisted: true" "$file"; then
        echo "Error: unlisted posts found. Please publish or move to private before pushing to upstream."
        echo "-----------------------------------"
        echo "===> $file"
        echo "-----------------------------------"
        unlistedFiles=$((unlistedFiles + 1))
    fi
done

if [ $unlistedFiles -gt 0 ]; then
    echo "Total unlisted files found: $unlistedFiles. Please resolve these issues before pushing to upstream."
    exit 1
else
    echo "No unlisted posts found. Proceeding with push to upstream."
    git pull upstream main \
        && git add -A \
        && git commit -m "Sync downstream $(date '+%d/%m/%Y %H:%M:%S')" \
        && git push upstream main
fi