export type Props = {
    initialUsers: Array<string>;
    saveAction: (usersToAdd: Array<string>) => void;
    nonEditableUsers?: Array<string>;
}
