import { CSSProperties, useState } from 'react';
import { Article } from 'src/components/article';
import { ArticleParamsForm } from 'src/components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from '../styles/index.module.scss';
import '../styles/index.scss';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const handleSettings = (newState: ArticleStateType) => {
		setArticleState(newState);
	};
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initialState={articleState}
				onSettings={handleSettings}
			/>
			<Article />
		</main>
	);
};
