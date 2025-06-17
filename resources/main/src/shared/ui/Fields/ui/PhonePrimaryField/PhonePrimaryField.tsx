import { Transition } from "@headlessui/react";
import clsx from "clsx";
import {
    ChangeEvent, FC, InputHTMLAttributes, useCallback,
} from "react";
import cls from "./PhonePrimaryField.module.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type InputAttrubutes = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

interface PhonePrimaryFieldProps extends InputAttrubutes {
    className?: string;
    placeholder?: string;
    value?: string | null;
    onChange?: (value: string) => void;
    onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string;
    isSuccess?: boolean;
    type?: string;
    readOnly?: boolean;
    Icon?: FC<React.SVGProps<SVGSVGElement>>;
    renderIcon?: boolean;
    isFeature?: boolean;
}

export const PhonePrimaryField: FC<PhonePrimaryFieldProps> = ({
    className, placeholder, value, onChange, onBlur, errorMessage, type = "text", isSuccess,
    Icon, renderIcon = true, readOnly, isFeature, ...otherProps
}) => {
    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value);
    }, [onChange]);

    const onBlurHandler = useCallback(() => {
        if (onBlur) {
            const fakeEvent = { target: { value: value ?? "" } } as ChangeEvent<HTMLInputElement>;
            onBlur(fakeEvent);
        }
    }, [onBlur, value]);

    return (
        <div className={clsx(cls.PhonePrimaryField, {
            [cls.PhonePrimaryField_error]: errorMessage,
            [cls.PhonePrimaryField_success]: isSuccess,
            [cls.PhonePrimaryField_emty]: true,
            [cls.PhonePrimaryField_readOnly]: readOnly,
        }, className)}
        >
            <span className={cls.PhonePrimaryField__placeholder}>{placeholder}</span>
            <div className={cls.PhonePrimaryField__wrapper}>
                <PhoneInput
                    country='ua'
                    placeholder={placeholder}
                    value={value || ""}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    containerClass={cls.PhonePrimaryField__phoneContainer}
                    inputProps={{
                        name: otherProps.name,
                        className: cls.PhonePrimaryField__input,
                        readOnly: readOnly,
                        type,
                        ...otherProps,
                    }}
                />
                <Transition
                    show={renderIcon}
                    as="div"
                    className={cls.PhonePrimaryField__iconWrapper}
                    enter={cls.PhonePrimaryField__iconWrapper_enter}
                    enterFrom={cls.PhonePrimaryField__iconWrapper_enterFrom}
                    enterTo={cls.PhonePrimaryField__iconWrapper_enterTo}
                    leave={cls.PhonePrimaryField__iconWrapper_leave}
                    leaveFrom={cls.PhonePrimaryField__iconWrapper_leaveFrom}
                    leaveTo={cls.PhonePrimaryField__iconWrapper_leaveTo}
                >
                    {Icon && <Icon className={cls.PhonePrimaryField__icon} />}
                </Transition>
            </div>
            <span className={cls.PhonePrimaryField__error}>{errorMessage}</span>
        </div>
    );
};
