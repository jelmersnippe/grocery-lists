export interface Props {
    defaultValue?: string;
    buttonLabel: string;
    placeholder?: string;
    onSubmit: (input: string) => void;
}
