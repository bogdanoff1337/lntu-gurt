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
import { PrimaryField, SecondaryField } from "@/shared/ui/Fields";
import { PageLoader } from "@/shared/ui/PageLoader";
import PenIcon from "../../assets/pen.svg?react";
import * as pageProfileSelectors from "../../model/selectors";
import { pageProfileActions } from "../../model/slice/pageProfileSlice";
import cls from "./ProfileForm.module.scss";
import {Controller, useForm} from "react-hook-form";
import { ProfileData } from "../../model/types/PageProfileSchema";

interface ProfileFormProps {
	className?: string
}

export const validationRules = {
    first_name: {
        required: 'Ім’я обов’язкове',
        maxLength: {
            value: 32,
            message: 'Максимум 32 символи',
        },
    },
    last_name: {
        required: 'Прізвище обов’язкове',
        maxLength: {
            value: 32,
            message: 'Максимум 32 символи',
        },
    },
    middle_name: {
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
        required: 'Введіть номер телефону',
        pattern: {
            value: /^\+380\d{9}$/,
            message: 'Некоректний номер',
        },
    },
    benefits: {
        maxLength: {
            value: 100,
            message: 'Максимум 100 символів',
        },
    },
}


export const ProfileForm: FC<ProfileFormProps> = ({ className }) => {
    const dispatch = useAppDispatch();
    const tempData = useSelector(pageProfileSelectors.getTempData);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileData>({
        mode: 'onBlur',
        defaultValues: tempData,
    });

    useEffect(() => {
        if (tempData) {
            reset(tempData);
        }
    }, [tempData, reset]);

	const isLoading = useSelector(pageProfileSelectors.getIsLoading);
	// const isFetching = useSelector(pageProfileSelectors.getIsFetching);
	const readOnly = useSelector(pageProfileSelectors.getReadOnly);

	const cities = useSelector(pageProfileSelectors.getCities);
	const citiesIsLoading = useSelector(pageProfileSelectors.getCitiesIsLoading);



    const onSubmit = useCallback((data: ProfileData) => {
        dispatch(pageProfileActions.changeLastName(data.last_name));
        dispatch(pageProfileActions.changeFatherName(data.middle_name));
        dispatch(pageProfileActions.changeFirstName(data.first_name));
        dispatch(pageProfileActions.changeGender(data.gender));
        dispatch(pageProfileActions.changeFaculty(data.faculty_id));
        dispatch(pageProfileActions.changeCourse(data.course));
        dispatch(pageProfileActions.changeAddress(data.city));
        dispatch(pageProfileActions.changeBenefits(data?.benefits ?? null));
        dispatch(pageProfileActions.changePhone(data.phone));

        dispatch(pageProfileActions.setReadOnly(true));
        dispatch(pageProfileActions.patchFormData());

        dispatch(entityAuthActions.getUser());

    }, [dispatch]);

	useEffect(() => {
		if (!tempData) {
			dispatch(pageProfileActions.getFormData());
		}
	}, [dispatch, tempData]);

	if (isLoading) {
		return <PageLoader />;
	}

    return (
        <form
            className={clsx(cls.ProfileForm, {}, [className])}
            onSubmit={handleSubmit(onSubmit)}
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
                    render={({ field }) => (
                        <GenderSelect
                            {...field}
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
                    render={({ field }) => (
                        <FacultySelect
                            {...field}
                            className={cls.Select}
                            Icon={PenIcon}
                            renderIcon={!readOnly}
                            readOnly={readOnly}
                            errorMessage={errors.faculty_id?.message}
                        />
                    )}
                />
                <Controller
                    name="course"
                    control={control}
                    rules={validationRules.course}
                    render={({ field }) => (
                        <CourseSelect
                            {...field}
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
                    render={({ field }) => (
                        <SecondaryField
                            {...field}
                            className={cls.Input}
                            action={pageProfileActions.getCities}
                            isLoading={citiesIsLoading}
                            active={field.value}
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
                        <PrimaryField
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
                    name="benefits"
                    control={control}
                    rules={validationRules.benefits}
                    render={({ field }) => (
                        <PrimaryField
                            {...field}
                            className={cls.Input}
                            placeholder="Пільга"
                            readOnly={readOnly}
                            renderIcon={!readOnly}
                            Icon={PenIcon}
                            errorMessage={errors.benefits?.message}
                        />
                    )}
                />
            </div>
            <PrimaryButton
                type="submit"
                className={clsx(cls.ProfileForm__saveButton, cls.ProfileForm__submit)}
                isLoading={isLoading}
            >
                Зберегти
            </PrimaryButton>
        </form>
    );
};
