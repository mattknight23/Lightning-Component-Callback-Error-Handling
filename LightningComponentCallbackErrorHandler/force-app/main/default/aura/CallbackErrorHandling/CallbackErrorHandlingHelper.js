({
    /**
    *   This method ensures that the successFunction is run if the callback was successfull and otherwise the error is handled gracefully.
    *   This method will add a new ui message component inside the errorhandler component with the error
    **/
    errorHandleCallback : function(errorComponent, event) {
        var params = event.getParam('arguments');
        var component = params.component;
        var response = params.response;
        var state = response.getState();
        var messageTitle;
        var messageContent;
        var messageType;
        switch(state) {
            case "SUCCESS":
                let returnValue = params.successFunction(component, response);
                if (!$A.util.isEmpty(returnValue)) {
                    messageTitle = returnValue.messageTitle;
                    messageContent = returnValue.messageContent;
                    messageType = returnValue.messageType;
                }
                break;
            case "INCOMPLETE":
                messageTitle = "There was an error with the connection";
                messageContent = "There was an error with the connection";
                messageType = "error";
                break;
            default:
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        messageContent = "Error message: " + errors[0].message;
                    }
                } else {
                    messageContent = "There was an unknown error";
                }
                messageTitle = "There was an unknown error";
                messageType = "error";
        }
        
        if (messageTitle) {
            $A.createComponents([
                ["ui:message",{
                    "title" : messageTitle,
                    "severity" : messageType,
                }],
                ["ui:outputText",{
                    "value" : messageContent
                }]
                ],
                function(components, status, errorMessage){
                    switch(status) {
                        case "SUCCESS":
                            var message = components[0];
                            var outputText = components[1];

                            // set the body of the ui:message to be the ui:outputText
                            message.set("v.body", outputText);
                            var div1 = errorComponent.find("messageDiv");

                            // Replace div body with the dynamic component
                            div1.set("v.body", message);
                            break;
                        case "INCOMPLETE":
                            alert("There was an unknown error")
                            break;
                        default:
                            alert("Error: " + errorMessage);
                    }
                }
            );
        }
    }
})