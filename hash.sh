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
        # remove file extension and content/ prefix
        filename=${file#content/}
        filename=${filename%.md}
        echo "Unlisted:"
        echo "https://toes.ch/$filename?HASH=$hash"
        echo "local: http://localhost:3000/$filename?HASH=$hash"
    fi
done