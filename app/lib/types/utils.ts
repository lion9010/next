export interface SwitchToggleProps {
    checkedInitial?: boolean;
    onChange?: (checked: boolean) => void;
    textLeft?: string;
    textRight?: string;
    iconLeft?: React.ReactElement;
    iconRight?: React.ReactElement;
    name?: string;
    title?: string;
}

export interface PasswordVisibilityProps {
    visible: boolean;
    toggleVisibility: () => void;
}