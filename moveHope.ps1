param ($version=0)
$versions = 'hope-js', 'hope-js2'

heroku ps:scale worker=0 -a $versions[$version -xor 1]
heroku ps:scale worker=1 -a $versions[$version]

Write-Host ('Moved to {0}' -f $versions[$version])