import clsx from "clsx";
import {
	FC, useCallback,
	useEffect,
} from "react";
import { useSelector } from "react-redux";
import { CourseSelect, FacultySelect, GenderSelect } from "@/features/Profile";
import { entityAuthActions } from "@/entities/Auth";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { PrimaryButton } from "@/shared/ui/Buttons";
import {PhonePrimaryField, PrimaryField, SecondaryField} from "@/shared/ui/Fields";
import { PageLoader } from "@/shared/ui/PageLoader";
import PenIcon from "../../assets/pen.svg?react";
import * as pageProfileSelectors from "../../model/selectors";
import { pageProfileActions } from "../../model/slice/pageProfileSlice";
import cls from "./ProfileForm.module.scss";
import {Controller, useForm} from "react-hook-form";
import { ProfileData } from "../../model/types/PageProfileSchema";
import {SelectSecondary} from "@/shared/ui/Select";

interface ProfileFormProps {
	className?: string
}

export const validationRules = {
    first_name: {
        required: 'Ім’я обов’язкове',
        minLength: {
            value: 2,
            message: 'Мінімум 2 символи',
        },
        maxLength: {
            value: 32,
            message: 'Максимум 32 символи',
        },
    },
    last_name: {
        required: 'Прізвище обов’язкове',
        minLength: {
            value: 2,
            message: 'Мінімум 2 символи',
        },
        maxLength: {
            value: 32,
            message: 'Максимум 32 символи',
        },
    },
    middle_name: {
        required: 'По-батькові обов’язкове',
        minLength: {
            value: 2,
            message: 'Мінімум 2 символи',
        },
        maxLength: {
            value: 32,
            message: 'Максимум 32 символи',
        },
    },
    gender: {
        required: 'Оберіть стать',
    },
    faculty_id: {
        required: 'Оберіть факультет',
    },
    course: {
        required: 'Оберіть курс',
    },
    city: {
        required: 'Виберіть місто',
    },
    phone: {
        minLength: {
            value: 5,
            message: 'Некоректний номер телефону',
        },
        required: 'Введіть номер телефону',

    },
}


export const ProfileForm: FC<ProfileFormProps> = ({ className }) => {
    const dispatch = useAppDispatch();
    const tempData = useSelector(pageProfileSelectors.getTempData);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileData>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: tempData,
    });

	const isLoading = useSelector(pageProfileSelectors.getIsLoading);
	const readOnly = useSelector(pageProfileSelectors.getReadOnly);

	const cities = useSelector(pageProfileSelectors.getCities);
	const citiesIsLoading = useSelector(pageProfileSelectors.getCitiesIsLoading);

    const privileges = useSelector(pageProfileSelectors.getPrivileges);


    const onSubmit = useCallback((data: ProfileData) => {
        dispatch(pageProfileActions.changeLastName(data.last_name));
        dispatch(pageProfileActions.changeFatherName(data.middle_name));
        dispatch(pageProfileActions.changeFirstName(data.first_name));
        dispatch(pageProfileActions.changeGender(data.gender));
        dispatch(pageProfileActions.changeFaculty(data.faculty_id));
        dispatch(pageProfileActions.changeCourse(data.course));
        dispatch(pageProfileActions.changeAddress(data.city));
        dispatch(pageProfileActions.changePrivilege(data?.privilege));
        dispatch(pageProfileActions.changePhone(data.phone));

        dispatch(pageProfileActions.setReadOnly(true));
        dispatch(pageProfileActions.patchFormData());

        dispatch(entityAuthActions.getUser());

    }, [dispatch]);

	useEffect(() => {
		if (!tempData) {
			dispatch(pageProfileActions.getFormData());
            dispatch(pageProfileActions.getPrivileges());
		}
	}, [dispatch, tempData]);

	if (isLoading) {
		return <PageLoader />;
	}

    return (
        <form
            className={clsx(cls.ProfileForm, {}, [className])}
            onSubmit={handleSubmit(onSubmit, (e) => console.log(e))}
        >
            <div className={cls.ProfileForm__list}>
                <Controller
                    name="first_name"
                    control={control}
                    rules={validationRules.first_name}
                    render={({ field }) => (
                        <PrimaryField
                            {...field}
                            className={cls.Input}
                            placeholder="Ім’я"
                            readOnly={readOnly}
                            renderIcon={!readOnly}
                            Icon={PenIcon}
                            errorMessage={errors.first_name?.message}
                        />
                    )}
                />
                <Controller
                    name="last_name"
                    control={control}
                    rules={validationRules.last_name}
                    render={({ field }) => (
                        <PrimaryField
                            {...field}
                            className={cls.Input}
                            placeholder="Прізвище"
                            readOnly={readOnly}
                            renderIcon={!readOnly}
                            Icon={PenIcon}
                            errorMessage={errors.last_name?.message}
                        />
                    )}
                />
                <Controller
                    name="middle_name"
                    control={control}
                    rules={validationRules.middle_name}
                    render={({ field }) => (
                        <PrimaryField
                            {...field}
                            className={cls.Input}
                            placeholder="По батькові"
                            readOnly={readOnly}
                            renderIcon={!readOnly}
                            Icon={PenIcon}
                            errorMessage={errors.middle_name?.message}
                        />
                    )}
                />
                <Controller
                    name="gender"
                    control={control}
                    rules={validationRules.gender}
                    render={({ field: { onChange, value } }) => (
                        <GenderSelect
                            onChange={onChange}
                            value={value}
                            className={cls.Select}
                            Icon={PenIcon}
                            renderIcon={!readOnly}
                            readOnly={readOnly}
                            errorMessage={errors.gender?.message}
                        />
                    )}
                />
                <Controller
                    name="faculty_id"
                    control={control}
                    rules={validationRules.faculty_id}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <FacultySelect
                                onChange={onChange}
                                id={value}
                                className={cls.Select}
                                Icon={PenIcon}
                                renderIcon={!readOnly}
                                readOnly={readOnly}
                                errorMessage={errors.faculty_id?.message}
                            />
                        )
                    }}
                />
                <Controller
                    name="course"
                    control={control}
                    rules={validationRules.course}
                    render={({ field: { onChange, value } }) => (
                        <CourseSelect
                            onChange={onChange}
                            id={value}
                            className={cls.Select}
                            Icon={PenIcon}
                            renderIcon={!readOnly}
                            readOnly={readOnly}
                            errorMessage={errors.course?.message}
                        />
                    )}
                />
                <Controller
                    name="city"
                    control={control}
                    rules={validationRules.city}
                    render={({ field: { value, onChange } }) => (
                        <SecondaryField
                            className={cls.Input}
                            action={pageProfileActions.getCities}
                            isLoading={citiesIsLoading}
                            active={value}
                            onChange={onChange}
                            data={cities}
                            placeholder="Місце проживання"
                            readOnly={readOnly}
                            renderIcon={!readOnly}
                            Icon={PenIcon}
                            isFeature
                            errorMessage={errors.city?.message}
                        />
                    )}
                />
                <Controller
                    name="phone"
                    control={control}
                    rules={validationRules.phone}
                    render={({ field }) => (
                        <PhonePrimaryField
                            {...field}
                            className={cls.Input}
                            placeholder="Номер телефону"
                            readOnly={readOnly}
                            renderIcon={!readOnly}
                            Icon={PenIcon}
                            errorMessage={errors.phone?.message}
                        />
                    )}
                />
                <Controller
                    name="privilege"
                    control={control}
                    render={({ field: { value, onChange } }) => {
                        return (
                            <SelectSecondary
                                id={value}
                                placeholder="Пільга"
                                onChange={onChange}
                                options={privileges?.map((item) => ({
                                    id: item.id,
                                    slug: item.name
                                }))}
                                Icon={PenIcon}
                                renderIcon={!readOnly}
                                readOnly={readOnly}
                                errorMessage={errors.course?.message}
                            />)
                    }}
                />
            </div>
            {!readOnly && <PrimaryButton
                type="submit"
                className={clsx(cls.ProfileForm__saveButton, cls.ProfileForm__submit)}
                isLoading={isLoading}
            >
                Зберегти
            </PrimaryButton>}
        </form>
    );
};
