/*
Added new deploy step - Check API Contracts which includes next items:

generate schema.json by python with all endpoints declaration
generate our DTOs and services by open api generator in generate-api.ts form schema.json
typescript compilation check to approve that we support types. from schema.json

If Backend added new field to some endpoint input/output or new endpoint typescript check will ends successfully
because we don't use it in frontend code,
another way if some fields or endpoints will be changed/removed typescript checker throw exception for transformer or service layers

to run API generation manually for schema on env.BACKEND_URL run next command: npm run openapi or npm run openapi 'path_to_json_schema'
*/

async function main() {
  console.log('Contract API generating...');
  const args = process.argv.slice(2);
  console.log('Arguments: ', args);

  require('dotenv').config();
  const {execSync} = require('child_process');

  const removeCmd = 'rm -rf src/generatedAPI;';
  const cleanupCmd =
      'rm -rf src/generatedAPI/.openapi-generator src/generatedAPI/.openapi-generator-ignore src/generatedAPI/.gitignore src/generatedAPI/.npmignore src/generatedAPI/git_push.sh';
  const prettierCmd = 'npx prettier --write src/generatedAPI/';

  //Use path to json schema if set else use url to app with swagger schema
  let inputSpec = args.length > 0
    ? args[0]
    : new URL('/openapi.json', process.env.BACKEND_URL).href;


  const output = 'src/generatedAPI';
  const params = Object.entries({
    supportsES6: true,
    disallowAdditionalPropertiesIfNotPresent: false,
    legacyDiscriminatorBehavior: false,
    ensureUniqueParams: true,
    withSeparateModelsAndApi: true,
    modelPackage: 'models',
    apiPackage: 'api',
    npmVersion: '6.9.0',
    useSingleRequestParameter: true,
  }).reduce((str, [p, val]) => `${str}${p}=${val},`, '');

  await execSync(`npx openapi-generator-cli version-manager set 6.3.0`);

  //-g typescript-axios to use axios
  await execSync(
      `${removeCmd} npx openapi-generator-cli generate \
    -i ${inputSpec} \
    -o ${output} \
    -g typescript-axios \
    --additional-properties=${params}`
  );

  console.log('Cleanup...');
  await execSync(cleanupCmd);
  await execSync(prettierCmd);

  console.log('Contract api has generated.');
}

main();
