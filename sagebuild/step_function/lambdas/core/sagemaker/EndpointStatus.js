var aws=require('aws-sdk')
aws.config.region=process.env.AWS_REGION 
var sagemaker=new aws.SageMaker()

exports.handler=(event,context,cb)=>{
    console.log("EVENT:",JSON.stringify(event,null,2))
    try{ 
        sagemaker.describeEndpoint({
            EndpointName:event.params.endpointname
        }).promise()
        .then(result=>{
            cb(null,result)
        })
        .catch(function(error){
            console.log(error)
            if(error.message.match(/Could not find endpoint/)){
                cb(null,{EndpointStatus:"Empty"})
            }else{
                cb(new Error(error))
            }
        })
    }catch(e){
        console.log(e)
        cb(new Error(e))
    }
}
