import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import { useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	initialState: ArticleStateType;
	onSettings: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	initialState,
	onSettings,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const [formData, setFormData] = useState(initialState);

	const handleSelectChange = (
		field: keyof ArticleStateType,
		option: OptionType
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: option,
		}));
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onSettings(formData);
	};

	const handleReset = () => {
		setFormData(defaultArticleState);
		onSettings(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31} weight={800} family='open-sans' uppercase>
						{'задайте параметры'}
					</Text>

					<Select
						selected={formData.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							handleSelectChange('fontFamilyOption', option)
						}
						title='шрифт'
					/>

					<RadioGroup
						selected={formData.fontSizeOption}
						options={fontSizeOptions}
						title='размер шрифта'
						onChange={(option) => handleSelectChange('fontSizeOption', option)}
						name='font-size'
					/>

					<Select
						selected={formData.fontColor}
						options={fontColors}
						onChange={(option) => handleSelectChange('fontColor', option)}
						title='цвет шрифта'
					/>

					<Separator />

					<Select
						selected={formData.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleSelectChange('backgroundColor', option)}
						title='цвет фона'
					/>

					<Select
						selected={formData.contentWidth}
						options={contentWidthArr}
						onChange={(option) => handleSelectChange('contentWidth', option)}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
