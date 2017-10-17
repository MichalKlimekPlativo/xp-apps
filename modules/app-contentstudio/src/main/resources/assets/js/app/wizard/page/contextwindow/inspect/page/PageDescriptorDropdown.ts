import LoadedDataEvent = api.util.loader.event.LoadedDataEvent;
import DescriptorBasedDropdown = api.content.page.region.DescriptorBasedDropdown;
import ApplicationRemovedEvent = api.content.site.ApplicationRemovedEvent;
import PageDescriptor = api.content.page.PageDescriptor;
import PageDescriptorViewer = api.content.page.PageDescriptorViewer;
import PageDescriptorLoader = api.content.page.PageDescriptorLoader;
import {LiveEditModel} from '../../../../../../page-editor/LiveEditModel';
import {SetController} from '../../../../../../page-editor/PageModel';

export class PageDescriptorDropdown
    extends DescriptorBasedDropdown<PageDescriptor> {

    private loadedDataListeners: { (event: LoadedDataEvent<PageDescriptor>): void }[];

    private liveEditModel: LiveEditModel;

    constructor(model: LiveEditModel) {
        super({
            optionDisplayValueViewer: new PageDescriptorViewer(),
            dataIdProperty: 'value'
        }, 'page-controller');

        this.loadedDataListeners = [];
        this.liveEditModel = model;

        this.initListeners();
    }

    load() {
        (<PageDescriptorLoader>this.loader).setApplicationKeys(this.liveEditModel.getSiteModel().getApplicationKeys());

        super.load();
    }

    protected createLoader(): PageDescriptorLoader {
        return new PageDescriptorLoader();
    }

    handleLoadedData(event: LoadedDataEvent<PageDescriptor>) {
        super.handleLoadedData(event);
        this.notifyLoadedData(event);
    }

    private initListeners() {
        this.onOptionSelected(this.handleOptionSelected.bind(this));

        let onApplicationAddedHandler = () => {
            this.load();
        };

        let onApplicationRemovedHandler = (event: ApplicationRemovedEvent) => {

            let currentController = this.liveEditModel.getPageModel().getController();
            let removedApp = event.getApplicationKey();
            if (currentController && removedApp.equals(currentController.getKey().getApplicationKey())) {
                // no need to load as current controller's app was removed
                this.liveEditModel.getPageModel().reset();
            } else {
                this.load();
            }
        };

        this.liveEditModel.getSiteModel().onApplicationAdded(onApplicationAddedHandler);

        this.liveEditModel.getSiteModel().onApplicationRemoved(onApplicationRemovedHandler);

        this.onRemoved(() => {
            this.liveEditModel.getSiteModel().unApplicationAdded(onApplicationAddedHandler);
            this.liveEditModel.getSiteModel().unApplicationRemoved(onApplicationRemovedHandler);
        });
    }

    protected handleOptionSelected(event: api.ui.selector.OptionSelectedEvent<api.content.page.PageDescriptor>) {
        let pageDescriptor = event.getOption().displayValue;
        let setController = new SetController(this).setDescriptor(pageDescriptor);
        this.liveEditModel.getPageModel().setController(setController);
    }

    onLoadedData(listener: (event: LoadedDataEvent<PageDescriptor>) => void) {
        this.loadedDataListeners.push(listener);
    }

    unLoadedData(listener: (event: LoadedDataEvent<PageDescriptor>) => void) {
        this.loadedDataListeners =
            this.loadedDataListeners.filter((currentListener: (event: LoadedDataEvent<PageDescriptor>) => void) => {
                return currentListener !== listener;
            });
    }

    private notifyLoadedData(event: LoadedDataEvent<PageDescriptor>) {
        this.loadedDataListeners.forEach((listener: (event: LoadedDataEvent<PageDescriptor>) => void) => {
            listener.call(this, event);
        });
    }

}
