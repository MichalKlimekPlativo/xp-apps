const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const assert = chai.assert;
var webDriverHelper = require('../libs/WebDriverHelper');
var appConstant = require('../libs/app_const');
const studioUtils = require('../libs/studio.utils.js');
const appBrowsePanel = require('../page_objects/applications/applications.browse.panel');
const installAppDialog = require('../page_objects/applications/install.app.dialog');


describe('Grid Panel & Toolbar', function () {
    this.timeout(70000);
    webDriverHelper.setupBrowser();

    it(`Grid Panel & Toolbar`, () => {
        console.log('Test');
        studioUtils.saveScreenshot(webDriverHelper.browser, "workshop");
        return appBrowsePanel.clickOnInstallButton().then(() => {
            console.log('Test2');
            studioUtils.saveScreenshot(webDriverHelper.browser, "workshop2");
            return installAppDialog.waitForLoaded();
        }).then(() => {
            console.log('Test3');
            studioUtils.saveScreenshot(webDriverHelper.browser, "workshop3");
            return Promise.all([installAppDialog.clickOnInstallLink(0), installAppDialog.clickOnInstallLink(1)]);
        }).then(() => {
            console.log('Test4');
            studioUtils.saveScreenshot(webDriverHelper.browser, "workshop4");
            return appBrowsePanel.waitForRowByNameVisible('Add Auth0 authentication to your Enonic XP installation')
        }).then(() => {
            console.log('Test5');
            studioUtils.saveScreenshot(webDriverHelper.browser, "workshop5");
        });
    });

    beforeEach(() => studioUtils.navigateToApplicationsApp(webDriverHelper.browser));
    afterEach(() => studioUtils.doCloseCurrentBrowserTab(webDriverHelper.browser));
});
