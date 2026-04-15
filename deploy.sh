#/bin/bash
git commit --allow-empty -m "trigger deploy $(date '+%d/%m/%Y %H:%M:%S')" && git push