pushd server 
echo "Building and deploying new version of server"

dotnet publish;

pushd bin/Debug/netstandard2.0/publish/

zip -r functions.zip ./

curl -X POST -u itv-ank --data-binary @"functions.zip" https://flappy-nerd.scm.azurewebsites.net/api/zipdeploy

popd

echo "Check list of deployments to flappy-nerds at: https://flappy-nerd.scm.azurewebsites.net/api/deployments"

popd

echo "Deploying new version of client"

for f in $(find ./client); do az storage blob upload -c app --account-name flappynerdstorage -f $f -n ${f#*/client/}; done
