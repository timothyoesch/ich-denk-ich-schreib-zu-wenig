#!/bin/bash
find content/posts -type f -name "*.md" | while read -r file; do
    if grep -q "unlisted: true" "$file"; then
        hash=$(cat "$file" | sha256sum | awk '{print $1}')
        if grep -q "hash:" "$file"; then
            gsed -i "s/hash: .*/hash: $hash/" "$file"
        else
            gsed -i -e "/unlisted: true/a hash: $hash" "$file"
        fi
        echo ""
        # echo "Unlisted: https://toes.ch/<filename without 'content/'>?HASH=$hash"
        echo "Unlisted: https://toes.ch/${file#content/}?HASH=$hash"
    fi
done