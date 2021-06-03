param ($version=0)

$versions = 'hope-js', 'hope-js2'

Write-Host ('Deploying to {0}' -f $versions[$version])

git add .
git commit -am "Scripted commit"
git push
heroku ps:scale worker=0 -a $versions[$version -xor 1]
heroku ps:scale worker=1 -a $versions[$version]
heroku logs -a $versions[$version] --tail