# Lightning-Component-Callback-Error-Handling
A lightning component which will handle callback errors and display the error message

.cmp file:

  ```JavaScript
    <c:CallbackErrorHandling aura:id="callbackHandler" />
  ```

.js file:

```JavaScript
({
    doInit : function(component, event, helper) {
        var action = component.get("c.getNumbers");
        action.setParams({
            "accountId": component.get("v.recordId")
        });
        // Register the callback function
        action.setCallback(this, function(response) {
            var callbackHandler = component.find('callbackHandler');
                callbackHandler.handleCallback( 
                    component,
                    response,
                    function(component, response) {
                        component.set("v.numbers", response.getReturnValue());
                    }
                )
        });
        // Invoke the service
        $A.enqueueAction(action);
    },
})
```

