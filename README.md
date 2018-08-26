## Deployment

az login

az account set -s <subId>

az group create --name wineventory --location northeurope

<!-- Create storage account -->
az storage account create --name wineventorystorage --location northeurope --resource-group wineventory --sku Standard_GRS

az storage container create --name webapp --account-name wineventorystorage --public-access blob

<!-- Deploy app files to blob container -->
for f in $(find ./build); do az storage blob upload -c webapp --account-name wineventorystorage -f $f -n ${f#*/build/}; done

<!-- Create function app -->
az functionapp create \
--resource-group wineventory --consumption-plan-location northeurope \
--name winefunctions --storage-account wineventorystorage  

zip -r functions.zip ./

az functionapp deployment source config-zip -g wineventory -n \
winefunctions --src functions.zip

curl -X POST -u anderskofoed --data-binary @"functions.zip" https://wineventory.scm.azurewebsites.net/api/zipdeploy