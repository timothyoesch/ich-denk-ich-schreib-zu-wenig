#!/bin/bash
find content/posts -type f -name "*.md" | while read -r file; do
    if grep -q "unlisted: true" "$file"; then
        content=$(grep -v "hash: " "$file")
        hash=$(echo "$content" | sha256sum | awk '{print $1}')
        if grep -q "hash: " "$file"; then
            if grep -q "hash: $hash" "$file"; then
                :
            else
                gsed -i -e "s/hash: .*/hash: $hash/" "$file"
            fi
        else
            gsed -i -e "/unlisted: true/a hash: $hash" "$file"
        fi
        echo ""
        filename=${file#content/}
        filename=${filename%.md}
        echo "Unlisted:"
        echo "https://toes.ch/$filename?HASH=$hash"
        echo "local: http://localhost:3000/$filename?HASH=$hash"
    fi
done