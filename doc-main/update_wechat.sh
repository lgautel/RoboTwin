#!/bin/bash
git pull --no-rebase

jpg_file=$(ls . | grep 'jpg')
mv $jpg_file ./docs/community/images/wechat-group.jpg

mkdocs gh-deploy --remote-name origin --remote-branch gh-pages
git add .
git commit -m "update"
git push