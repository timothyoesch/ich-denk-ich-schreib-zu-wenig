find content/posts -type f -name "*.md" | while read -r file; do
    if grep -q "unlisted: true" "$file"; then
        ## Extract only the hash line from the file
        hash=$(grep "hash: " "$file")
        # echo ${content#hash: }
        echo ""
        filename=${file#content/}
        filename=${filename%.md}
        echo "Unlisted:"
        echo "https://toes.ch/$filename?HASH=${hash#hash: }"
        echo "local: http://localhost:3000/$filename?HASH=${hash#hash: }"
    fi
done