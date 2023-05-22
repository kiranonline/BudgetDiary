export const english = {
    "common": {
        "errors": {
            "unknown": "Something went wrong"
        },
        "others": {
            "cancelButtonText": "Cancel"
        }
    },
    "screens": {
        "loginScreen": {
            "loginButtonText": "Login",
            "loginFailedTitle": "OOP!",
            "loginCancelledDescription": "Login cancelled",
            "playServiceNotAvailableDescription": "Google Play service is not available",
            "retryButtonText": "Retry Login",
        },
        "playgroundScreen": {
            "tabs": {
                "myAccountsLabel": "Accounts",
                "createMyAccountsLabel": "Create Account"
            },
            "addNewAccount": {
                "pageTitle": "Add new Account",
                "formFields": {
                    "name": {
                        "label": "Account Name",
                        "placeholder": "e.g. HDFC Bank Savings Account",
                        'validationMessages': {
                            'required': 'Account Name is required'
                        }
                    },
                    "amount": {
                        "label": "Amount",
                        "placeholder": "e.g. 1000",
                        'validationMessages': {
                            'required': 'Initial Amount is required',
                            'pattern': 'Invalid amount'
                        }
                    },
                    "accountType": {
                        "label": "Account Type",
                        "placeholder": "e.g. Savings",
                        'validationMessages': {
                            'required': 'Account Type is required'
                        }
                    },
                    "saveButtontext": "Save"
                }
            }
        }
    },
    "drawer": {
        "options": {
            "playground": "Playground",
            "myProfile": "My Profile",
            "settings": "Settings",
            "logout": "Logout",
            "retryLogout": "Retry Logout",
            "logoutFailedTitle": "Logout Failed"
        }
    }
}