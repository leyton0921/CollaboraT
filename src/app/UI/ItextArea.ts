export interface ItextAreaProps{
    label: string;
    id: string;
    value: string;
    onChange: (event:React.ChangeEvent<HTMLTextAreaElement>) => void;

}