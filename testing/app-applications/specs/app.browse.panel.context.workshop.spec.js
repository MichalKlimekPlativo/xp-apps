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
        studioUtils.saveScreenshot(webDriverHelper.browser, "01-before");
        return appBrowsePanel.clickOnInstallButton().then(() => {
            console.log('02-clickinstall');
            studioUtils.saveScreenshot(webDriverHelper.browser, "02-clickinstall");
            return installAppDialog.waitForLoaded();
        }).then(() => {
            console.log('03-waitforloaded');
            studioUtils.saveScreenshot(webDriverHelper.browser, "03-waitforloaded");
            return Promise.all([installAppDialog.clickOnInstallLink(0), installAppDialog.clickOnInstallLink(1)]);
        }).then(() => {
            console.log('04-clickinstall');
            studioUtils.saveScreenshot(webDriverHelper.browser, "04-clickinstall");
            return installAppDialog.clickOnCancelButtonTop();
        }).then(() => {
            console.log('05-closedialog');
            studioUtils.saveScreenshot(webDriverHelper.browser, "05-closedialog");
            return Promise.all([appBrowsePanel.waitForRowByNameVisible('Add Auth0 authentication to your Enonic XP installation'),
                appBrowsePanel.waitForRowByNameVisible('Add full-featured chat capabilities to your website.')])
        }).then(() => {
            console.log('06-checkrows');
            studioUtils.saveScreenshot(webDriverHelper.browser, "06-checkrows");
            return appBrowsePanel.clickOnRowByName('Add Auth0 authentication to your Enonic XP installation');
        }).then(() => {
            console.log('07-selectrow');
            studioUtils.saveScreenshot(webDriverHelper.browser, "07-selectrow");
            return Promise.all([appBrowsePanel.waitForUninstallButtonEnabled(), appBrowsePanel.waitForStopButtonEnabled(), appBrowsePanel.waitForStartButtonEnabled(true)]);
        }).then(() => {
            console.log('08-checkbuttons');
            studioUtils.saveScreenshot(webDriverHelper.browser, "08-checkbuttons");
            return appBrowsePanel.clickOnRowByName('Add Auth0 authentication to your Enonic XP installation');
        }).then(() => {
            console.log('Test8');
            studioUtils.saveScreenshot(webDriverHelper.browser, "workshop8");
            return Promise.all([appBrowsePanel.waitForUninstallButtonEnabled(true), appBrowsePanel.waitForStopButtonEnabled(true), appBrowsePanel.waitForStartButtonEnabled(true)]);
        }).then(() => {
            console.log('Test9');
            studioUtils.saveScreenshot(webDriverHelper.browser, "workshop9");
        });
    });

    beforeEach(() => studioUtils.navigateToApplicationsApp(webDriverHelper.browser));
    afterEach(() => studioUtils.doCloseCurrentBrowserTab(webDriverHelper.browser));
});
