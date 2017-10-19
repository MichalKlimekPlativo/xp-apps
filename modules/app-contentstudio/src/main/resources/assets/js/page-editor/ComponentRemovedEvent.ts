import './../api.ts';
import {ComponentView} from './ComponentView';
import {RegionView} from './RegionView';
import Component = api.content.page.region.Component;

export class ComponentRemovedEvent
    extends api.event.Event {

    private componentView: ComponentView<Component>;
    private parentRegionView: RegionView;

    constructor(componentView: ComponentView<Component>, regionView: RegionView) {
        super();
        this.componentView = componentView;
        this.parentRegionView = regionView;
    }

    getComponentView(): ComponentView<Component> {
        return this.componentView;
    }

    getParentRegionView(): RegionView {
        return this.parentRegionView;
    }

    static on(handler: (event: ComponentRemovedEvent) => void, contextWindow: Window = window) {
        api.event.Event.bind(api.ClassHelper.getFullName(this), handler, contextWindow);
    }

    static un(handler?: (event: ComponentRemovedEvent) => void, contextWindow: Window = window) {
        api.event.Event.unbind(api.ClassHelper.getFullName(this), handler, contextWindow);
    }
}

