var aws=require('aws-sdk')
aws.config.region=process.env.AWS_REGION 
var codebuild=new aws.CodeBuild()

exports.handler=(event,context,cb)=>{
    console.log("EVENT:",JSON.stringify(event,null,2))
    codebuild.startBuild({
        projectName:event.params.projectname,
        environmentVariablesOverride:[{
            name:"IMAGE_TAG",
            value:`Inference_v${event.params.version}`
        },{
            name:"DOCKERFILE_PATH",
            value:event.params[`dockerfile_path_Inference`]
        }]
    }).promise()
    .then(result=>cb(null,result.build))
    .catch(x=>cb(new Error(x)))
}
