param ($version=0)
$versions = 'hope-js', 'hope-js2'
heroku logs -a $versions[$version] --tail