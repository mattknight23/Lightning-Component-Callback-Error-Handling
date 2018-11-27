({
    /**
    *   This method passes the component that is the error handler and the calling params to the helper.
    *   The helper the ensure that the successFunction is run if the callback was successfull and otherwise the error is handled gracefully
    **/
    handleCallback : function(errorComponent, event, helper) {
        helper.errorHandleCallback(errorComponent, event);
    }

})