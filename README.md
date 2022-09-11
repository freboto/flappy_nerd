## Deployment

az login

- Choose subscription: `az account set --subscription <subscription id>`
- Deploy to function app: `func azure functionapp publish employee-image-provider` --csharp

## Deploy static files

export AZURE_STORAGE_SAS_TOKEN=<sastoken>

for f in $(find ./client); do az storage blob upload -c app --account-name itvflappynerdb9df --container-name flappy-nerd-client -f $f -n ${f#\*/client/}; done
