var page = require('../page');
var elements = require('../../libs/elements');
var dialog = {
    container: `//div[contains(@id,'UninstallApplicationDialog')]`,
    yesButton: `//button[contains(@id,'DialogButton')]/span[text()='Yes']`,
    noButton:  `//button[contains(@id,'DialogButton')]/span[text()='No']`
};
var uninstallAppDialog = Object.create(page, {

    cancelButtonTop:        {
        get: function () {
            return `${dialog.container}${elements.CANCEL_BUTTON_TOP}`;
        }
    },
    yesButton:              {
        get: function () {
            return `${dialog.container}${dialog.yesButton}`;
        }
    },
    noButton:               {
        get: function () {
            return `${dialog.container}${dialog.noButton}`;
        }
    },
    clickOnCancelButtonTop: {
        value: function () {
            return this.doClick(this.cancelButtonTop).catch((err) => {
                this.saveScreenshot('err_uninstall_dialog_cancel');
                throw new Error('Error when try click on cancel button ' + err);
            })
        }
    },
    clickOnYesButton:       {
        value: function () {
            return this.doClick(this.yesButton).catch((err) => {
                throw new Error('Error when try click on no button ' + err);
            })
        }
    },
    waitForOpened:          {
        value: function () {
            return this.waitForVisible(`${dialog.container}`, 3000).catch(err => {
                this.saveScreenshot('err_uninstall_dialog_load');
                throw new Error('Uninstall was not loaded! ' + err);
            });
        }
    },
    waitForClosed:          {
        value: function () {
            return this.waitForNotVisible(`${dialog.container}`, 3000).catch(error => {
                this.saveScreenshot('err_uninstall_dialog_close');
                throw new Error('Uninstall Dialog was not closed');
            });
        }
    },
});
module.exports = uninstallAppDialog;
