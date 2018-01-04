const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const assert = chai.assert;
var webDriverHelper = require('../libs/WebDriverHelper');
var appConstant = require('../libs/app_const');
const studioUtils = require('../libs/studio.utils.js');
const appBrowsePanel = require('../page_objects/applications/applications.browse.panel');


describe('Workshop test....', function () {
    this.timeout(70000);
    webDriverHelper.setupBrowser();

    it(`Office League`, () => {
        console.log('Test');
        studioUtils.saveScreenshot(webDriverHelper.browser, "workshop");
        appBrowsePanel.clickOnInstallButton().then(() => {
            console.log('Test2');
            studioUtils.saveScreenshot(webDriverHelper.browser, "workshop2");
        });
    });

    beforeEach(() => studioUtils.navigateToApplicationsApp(webDriverHelper.browser));
    //afterEach(() => studioUtils.doCloseCurrentBrowserTab(webDriverHelper.browser));
});
