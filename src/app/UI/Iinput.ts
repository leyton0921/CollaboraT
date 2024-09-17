export interface IinputProps{
    label: string;
    type: string;
    placeholder: string;
    id: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}