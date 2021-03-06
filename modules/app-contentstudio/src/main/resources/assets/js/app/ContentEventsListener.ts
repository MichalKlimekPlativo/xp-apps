import '../api.ts';
import {NewContentEvent} from './create/NewContentEvent';
import {ViewContentEvent} from './browse/ViewContentEvent';
import {SortContentEvent} from './browse/SortContentEvent';
import {MoveContentEvent} from './move/MoveContentEvent';
import {ContentEventsProcessor} from './ContentEventsProcessor';
import EditContentEvent = api.content.event.EditContentEvent;
import ContentUpdatedEvent = api.content.event.ContentUpdatedEvent;

export class ContentEventsListener {

    private started: boolean = false;

    constructor() {

        NewContentEvent.on((event) => {
            if (this.started) {
                ContentEventsProcessor.handleNew(event);
            }
        });

        ViewContentEvent.on((event) => {
            if (this.started) {
                // Do we use this any more ?
            }
        });

        EditContentEvent.on((event) => {
            if (this.started) {
                ContentEventsProcessor.handleEdit(event);
            }
        });

        ContentUpdatedEvent.on((event) => {
            if (this.started) {
                ContentEventsProcessor.handleUpdated(event);
            }
        });

        SortContentEvent.on((event) => {
            if (this.started) {
                ContentEventsProcessor.handleSort(event);
            }
        });

        MoveContentEvent.on((event) => {
            if (this.started) {
                ContentEventsProcessor.handleMove(event);
            }
        });
    }

    start() {
        this.started = true;
    }

    stop() {
        this.started = false;
    }
}
