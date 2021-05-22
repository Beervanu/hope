$versions = 'hope-js', 'hope-js2'

heroku ps:scale worker=0 -a $versions[$args[0] -xor 1]
heroku ps:scale worker=1 -a $versions[$args[0]]

Write-Host ('Moved to {0}' -f $versions[$args[0]])