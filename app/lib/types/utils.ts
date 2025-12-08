export interface SwitchToggleProps {
    checkedInitial?: boolean;
    onChange?: (checked: boolean) => void;
    textLeft?: string;
    textRight?: string;
    iconLeft?: React.ReactElement;
    iconRight?: React.ReactElement;
    colorLeft?: string;
    colorRight?: string;
    name?: string;
    title?: string;
    className?: string;
}

export interface PasswordVisibilityProps {
    visible: boolean;
    toggleVisibility: () => void;
}