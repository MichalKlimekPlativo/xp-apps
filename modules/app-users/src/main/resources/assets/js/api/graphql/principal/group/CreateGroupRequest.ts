import {GraphQlRequest} from '../../GraphQlRequest';
import Group = api.security.Group;
import PrincipalKey = api.security.PrincipalKey;
import GroupJson = api.security.GroupJson;

export class CreateGroupRequest
    extends GraphQlRequest<any, Group> {

    private key: PrincipalKey;
    private displayName: string;
    private description: string;
    private members: PrincipalKey[] = [];
    private memberships: PrincipalKey[] = [];

    setKey(key: PrincipalKey): CreateGroupRequest {
        this.key = key;
        return this;
    }

    setDisplayName(displayName: string): CreateGroupRequest {
        this.displayName = displayName;
        return this;
    }

    setMembers(members: PrincipalKey[]): CreateGroupRequest {
        this.members = members.slice(0);
        return this;
    }

    setMemberships(memberships: PrincipalKey[]): CreateGroupRequest {
        this.memberships = memberships.slice(0);
        return this;
    }

    setDescription(value: string): CreateGroupRequest {
        this.description = value;
        return this;
    }

    getVariables(): { [key: string]: any } {
        let vars = super.getVariables();
        vars['key'] = this.key.toString();
        vars['displayName'] = this.displayName;
        vars['description'] = this.description;
        vars['members'] = this.members.map(key => key.toString());
        vars['memberships'] = this.memberships.map(key => key.toString());
        return vars;
    }

    getMutation(): string {
        return `mutation ($key: String!, $displayName: String!, $description: String, $members: [String], $memberships: [String]) {
            createGroup(key: $key, displayName: $displayName, description: $description, members: $members, memberships: $memberships) {
                key
                displayName
                description
                members
                memberships {
                    key
                    displayName
                    description
                }
            }
        }`;
    }

    sendAndParse(): wemQ.Promise<Group> {
        return this.mutate().then(json => this.fromJson(json.createGroup, json.error));
    }

    fromJson(group: GroupJson, error: string): Group {
        if (!group || error) {
            throw error;
        }
        return Group.fromJson(group);
    }

}
