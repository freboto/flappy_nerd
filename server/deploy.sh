dotnet publish;
pushd bin/Debug/netstandard2.0/publish/

curl -X POST -u itv-ank --data-binary @"functions.zip" https://flappy-nerd.scm.azurewebsites.net/api/zipdeploy

popd

echo "Check list of deployments to flappy-nerds at: https://flappy-nerd.scm.azurewebsites.net/api/deployments"