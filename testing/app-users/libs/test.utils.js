/**
 * Created on 6/28/2017.
 */
const launcherPanel = require('../page_objects/launcher.panel');
const homePage = require('../page_objects/home.page');
const loginPage = require('../page_objects/login.page');
const browsePanel = require('../page_objects/browsepanel/userbrowse.panel');
const userStoreWizard = require('../page_objects/wizardpanel/userstore.wizard');
const userWizard = require('../page_objects/wizardpanel/user.wizard');
const groupWizard = require('../page_objects/wizardpanel/group.wizard');
const roleWizard = require('../page_objects/wizardpanel/role.wizard');
const wizard = require('../page_objects/wizardpanel/wizard.panel');
const newPrincipalDialog = require('../page_objects/browsepanel/new.principal.dialog');
const filterPanel = require("../page_objects/browsepanel/principal.filter.panel");
const confirmationDialog = require("../page_objects/confirmation.dialog");

module.exports = {
    xpTabs: {},
    findAndSelectItem: function (name) {
        return this.typeNameInFilterPanel(name).then(()=> {
            return browsePanel.clickOnRowByName(name);
        });
    },
    typeNameInFilterPanel: function (name) {
        return filterPanel.isPanelVisible().then((result)=> {
            if (!result) {
                return browsePanel.clickOnSearchButton().then(()=> {
                    return filterPanel.waitForOpened();
                })
            }
            return;
        }).then(()=> {
            return filterPanel.typeSearchText(name);
        }).then(()=> {
            return browsePanel.waitForSpinnerNotVisible(3000);
        });
    },
    selectAndDeleteItem: function (name) {
        return this.findAndSelectItem(name).then(()=> {
            return browsePanel.waitForDeleteButtonEnabled();
        }).then((result)=> {
            return browsePanel.clickOnDeleteButton();
        }).then(()=> {
            return confirmationDialog.waitForDialogVisible();
        }).then(result=> {
            if (!result) {
                throw new Error('Confirmation dialog was not loaded!')
            }
            return confirmationDialog.clickOnYesButton();
        }).then(()=> {
            return browsePanel.waitForSpinnerNotVisible();
        })
    },
    navigateToUsersApp: function (browser) {
        return launcherPanel.waitForPanelVisible(1000).then(()=> {
            console.log("'user browse panel' should be loaded");
            return launcherPanel.clickOnUsersLink();
        }).then(()=> {
            return this.doSwitchToUsersApp(browser);
        }).catch(()=> {
            return this.doLoginAndSwitchToUsers(browser);
        })
    },

    doSwitchToUsersApp: function (browser) {
        console.log('testUtils:switching to users app...');
        return browser.getTabIds().then(tabs => {
            this.xpTabs = tabs;
            return browser.switchTab(this.xpTabs[1]);
        }).then(()=> {
            return browsePanel.waitForUsersGridLoaded(5000);
        });
    },

    doLoginAndSwitchToUsers: function (browser) {
        return loginPage.doLogin().then(()=> {
            return homePage.waitForXpTourVisible(5000);
        }).then(()=> {
            return homePage.doCloseXpTourDialog();
        }).then(()=> {
            return launcherPanel.clickOnUsersLink().pause(1000);
        }).then(()=> {
            return this.doSwitchToUsersApp(browser);
        }).catch((err)=> {
            throw new Error(err);
        })
    },

    doCloseUsersApp: function (browser) {
        return browser.close().pause(300).then(()=> {
            return browser.switchTab(this.xpTabs[0]);
        })
    },

    selectUserAndOpenWizard: function (displayName) {
        return this.findAndSelectItem(displayName).then(()=> {
            return browsePanel.waitForEditButtonEnabled();
        }).then((result)=> {
            if (!result) {
                throw new Error('Edit button is disabled!');
            }
            return browsePanel.clickOnEditButton();
        }).then(()=> {
            return userWizard.waitForOpened();
        })
    },
    selectRoleAndOpenWizard: function (displayName) {
        return this.findAndSelectItem(displayName).then(()=> {
            return browsePanel.waitForEditButtonEnabled();
        }).then((result)=> {
            if (!result) {
                throw new Error('`Edit` button is disabled!');
            }
            return browsePanel.clickOnEditButton();
        }).then(()=> {
            return roleWizard.waitForOpened();
        })
    },
    saveAndClose: function (displayName) {
        return wizard.waitAndClickOnSave().then(()=> {
            return browsePanel.doClickOnCloseTabButton(displayName);
        })
    },
    openWizardAndSaveUserStore: function (userStoreData) {
        return this.clickOnNewOpenUserStoreWizard().then(()=> {
            return userStoreWizard.typeData(userStoreData)
        }).then(()=> {
            return userStoreWizard.waitAndClickOnSave()
        }).pause(500);
    },

    clickOnNewOpenUserStoreWizard: function () {
        return browsePanel.clickOnNewButton().then(()=> {
            return newPrincipalDialog.waitForOpened();
        }).then(()=> {
            return newPrincipalDialog.clickOnItem(`User Store`);
        }).then(()=>userStoreWizard.waitForOpened());
    },
    clickOnSystemOpenUserWizard: function () {
        return browsePanel.clickOnRowByName('system').then(()=> {
            return browsePanel.waitForNewButtonEnabled();
        }).then(()=> {
            return browsePanel.clickOnNewButton();
        }).then(()=> {
            return newPrincipalDialog.clickOnItem('User');
        }).then(()=> {
            return userWizard.waitForOpened();
        });
    },
    clickOnSystemAndOpenGroupWizard: function () {
        return browsePanel.clickOnRowByName('system').then(()=> {
            return browsePanel.waitForNewButtonEnabled();
        }).then(()=> {
            return browsePanel.clickOnNewButton();
        }).then(()=> {
            return newPrincipalDialog.clickOnItem('Group');
        }).then(()=> {
            return groupWizard.waitForOpened();
        });
    },
    clickOnUserStoreAndOpenUserWizard: function (storeName) {
        return browsePanel.clickOnRowByName(storeName).then(()=> {
            return browsePanel.waitForNewButtonEnabled();
        }).then(()=> {
            return browsePanel.clickOnNewButton();
        }).then(()=> {
            return newPrincipalDialog.clickOnItem('User');
        }).then(()=> {
            return userWizard.waitForOpened();
        });
    },
    getDisplayedElements: function (browser, selector) {
        var elems = browser.elements(selector).filter;
        elems.value.map((element)=> {

        })
        //if(!elem.isVisible()){
        //    //do something
        //}
    }
};
