import '../../api.ts';
import {UserItemsTreeGrid} from './UserItemsTreeGrid';
import {UserBrowseToolbar} from './UserBrowseToolbar';
import {UserTreeGridItem, UserTreeGridItemType} from './UserTreeGridItem';
import {UserBrowseItemPanel} from './UserBrowseItemPanel';
import {UserTreeGridActions} from './UserTreeGridActions';
import {PrincipalBrowseFilterPanel} from './filter/PrincipalBrowseFilterPanel';
import {Router} from '../Router';
import {PrincipalServerEventsHandler} from '../event/PrincipalServerEventsHandler';
import TreeNode = api.ui.treegrid.TreeNode;
import BrowseItem = api.app.browse.BrowseItem;
import PrincipalType = api.security.PrincipalType;
import i18n = api.util.i18n;
import UserStore = api.security.UserStore;
import Principal = api.security.Principal;

export class UserBrowsePanel
    extends api.app.browse.BrowsePanel<UserTreeGridItem> {

    protected treeGrid: UserItemsTreeGrid;

    constructor() {
        super();

        this.bindServerEventListeners();

        const changeSelectionStatus = api.util.AppHelper.debounce((selection: TreeNode<UserTreeGridItem>[]) => {
            const singleSelection = selection.length === 1;
            const newAction = this.treeGrid.getTreeGridActions().NEW;

            let label;

            if (singleSelection && selection[0].getData().getType() !== UserTreeGridItemType.USER_STORE) {
                const userItem = selection[0].getData();
                let type;

                switch (userItem.getType()) {

                case UserTreeGridItemType.USERS:
                    type = i18n('field.user');
                    break;
                case UserTreeGridItemType.GROUPS:
                    type = i18n('field.userGroup');
                    break;
                case UserTreeGridItemType.ROLES:
                    type = i18n('field.role');
                    break;
                case UserTreeGridItemType.PRINCIPAL:
                    type = i18n(`field.${PrincipalType[userItem.getPrincipal().getType()].toLowerCase()}`);
                    break;
                default:
                    type = '';
                }

                label = [i18n('action.new'), type].join(' ');
            } else {
                label = `${i18n('action.new')}…`;
            }
            newAction.setLabel(label);
        }, 10);

        this.treeGrid.onSelectionChanged((currentSelection: TreeNode<UserTreeGridItem>[]) => changeSelectionStatus(currentSelection));

        this.treeGrid.onHighlightingChanged((node: TreeNode<UserTreeGridItem>) => changeSelectionStatus(node ? [node] : []));

        this.onShown(() => {
            Router.setHash('browse');
        });
    }

    private bindServerEventListeners() {
        const serverHandler = PrincipalServerEventsHandler.getInstance();

        serverHandler.onUserItemCreated((principal: Principal, userStore: UserStore, sameTypeParent?: boolean) => {
            this.treeGrid.appendUserNode(principal, userStore, sameTypeParent);
            this.setRefreshOfFilterRequired();
        });

        serverHandler.onUserItemUpdated((principal: Principal, userStore: UserStore) => {
            this.treeGrid.updateUserNode(principal, userStore);
        });

        serverHandler.onUserItemDeleted((ids: string[]) => {
            this.setRefreshOfFilterRequired();
            /*
             Deleting content won't trigger browsePanel.onShow event,
             because we are left on the same panel. We need to refresh manually.
             */

            ids.forEach(id => {
                const node = this.treeGrid.getRoot().getCurrentRoot().findNode(id);
                if (node) {
                    this.treeGrid.deleteNode(node.getData());
                }
            });

            this.refreshFilter();
        });
    }

    protected createToolbar(): UserBrowseToolbar {
        let browseActions = <UserTreeGridActions> this.treeGrid.getTreeGridActions();

        return new UserBrowseToolbar(browseActions);
    }

    protected createTreeGrid(): UserItemsTreeGrid {
        return new UserItemsTreeGrid();
    }

    protected createBrowseItemPanel(): UserBrowseItemPanel {
        return new UserBrowseItemPanel();
    }

    protected createFilterPanel(): PrincipalBrowseFilterPanel {
        return new PrincipalBrowseFilterPanel();
    }

    protected enableSelectionMode() {
        this.treeGrid.filter(this.treeGrid.getSelectedDataList());
    }

    treeNodesToBrowseItems(nodes: TreeNode<UserTreeGridItem>[]): BrowseItem<UserTreeGridItem>[] {
        let browseItems: BrowseItem<UserTreeGridItem>[] = [];

        // do not proceed duplicated content. still, it can be selected
        nodes.forEach((node: TreeNode<UserTreeGridItem>) => {
            let userGridItem = node.getData();

            let item = new BrowseItem<UserTreeGridItem>(userGridItem).setId(userGridItem.getDataId()).setDisplayName(
                userGridItem.getItemDisplayName()).setIconClass(this.selectIconClass(userGridItem));
            browseItems.push(item);

        });
        return browseItems;
    }

    private selectIconClass(item: UserTreeGridItem): string {

        let type: UserTreeGridItemType = item.getType();

        switch (type) {
        case UserTreeGridItemType.USER_STORE:
            return 'icon-address-book icon-large';

        case UserTreeGridItemType.PRINCIPAL:
            if (item.getPrincipal().isRole()) {
                return 'icon-masks icon-large';

            } else if (item.getPrincipal().isUser()) {
                return 'icon-user icon-large';

            } else if (item.getPrincipal().isGroup()) {
                return 'icon-users icon-large';
            }
            break;

        case UserTreeGridItemType.GROUPS:
            return 'icon-folder icon-large';

        case UserTreeGridItemType.ROLES:
            return 'icon-folder icon-large';

        case UserTreeGridItemType.USERS:
            return 'icon-folder icon-large';
        }

    }

    private convertUserItemsToUserTreeGridItems(principals: api.security.Principal[],
                                                userStores: api.security.UserStore[]): UserTreeGridItem[] {
        let userTreeGridItems: UserTreeGridItem[] = [];

        if (principals) {
            userTreeGridItems = userTreeGridItems.concat(principals.map((principal) => {
                return UserTreeGridItem.fromPrincipal(principal);
            }));
        }

        if (userStores) {
            userTreeGridItems = userTreeGridItems.concat(userStores.map((userStore) => {
                return UserTreeGridItem.fromUserStore(userStore);
            }));
        }

        return userTreeGridItems;
    }
}
