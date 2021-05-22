$versions = 'hope-js', 'hope-js2'
Write-Host ('Deploying to {0}' -f $versions[$args[0]])

git add .
git commit -am "Scripted commit"
git push
heroku ps:scale worker=0 -a $versions[$args[0] -xor 1]
heroku ps:scale worker=1 -a $versions[$args[0]]
heroku logs -a $versions[$args[0]] --tail