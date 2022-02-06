// Load the AWS SDK
var AWS = require('aws-sdk'),
region = "us-east-1",
secretName = process.env.TOKENNAME_ACCESS_API,
secret,
decodedBinarySecret;

/*
try{
  var credentials = new AWS.SharedIniFileCredentials({profile: 'tt'});
  AWS.config.credentials = credentials;
  console.log("Running enviroment local")
}catch (e) {
  console.log("Running enviroment cloud")
}*/

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
region: region
});

exports.handler =  function(event, context, callback) {
    console.log(event)

    var secretToken

    client.getSecretValue({SecretId: secretName}, function(err, data) {
        if (err) {
            console.log('Se genero error')
            console.log(err)
            if (err.code === 'DecryptionFailureException')
                // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'InternalServiceErrorException')
                // An error occurred on the server side.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'InvalidParameterException')
                // You provided an invalid value for a parameter.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'InvalidRequestException')
                // You provided a parameter value that is not valid for the current state of the resource.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'ResourceNotFoundException')
                // We can't find the resource that you asked for.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
        }
        else {
            console.log('Se obtuvo las credenciales')
            console.log(data)
            // Decrypts secret using the associated KMS key.
            // Depending on whether the secret is a string or binary, one of these fields will be populated.
            if ('SecretString' in data) {
                secret =  data.SecretString;
            } else {
                let buff = new Buffer(data.SecretBinary, 'base64');
                decodedBinarySecret = buff.toString('ascii');
            }
        }

        secretToken = secret? secret: decodedBinarySecret

        console.log(typeof(secretToken))

        console.log(secretToken)

        var token = event.authorizationToken;
        switch (token) {
            case JSON.parse(secretToken).authorizer_key:
                console.log('Allow')
                callback(null, generatePolicy('user', 'Allow', event.methodArn));
                break;
            case 'deny':
                console.log('deny')
                callback(null, generatePolicy('user', 'Deny', event.methodArn));
                break;
            case 'unauthorized':
                console.log('Unauthorized')
                callback("Unauthorized");   // Return a 401 Unauthorized response
                break;
            default:
                callback(null, generatePolicy('user', 'Deny', event.methodArn)); // Return a 500 Invalid token response
                break
        }

        });
};

// Help function to generate an IAM policy
var generatePolicy = function(principalId, effect, resource) {
    var authResponse = {};
    
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = '2012-10-17'; 
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; 
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    
    // Optional output with custom properties of the String, Number or Boolean type.
    authResponse.context = {
        "stringKey": "stringval",
        "numberKey": 123,
        "booleanKey": true
    };
    return authResponse;
}

