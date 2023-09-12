import css from './ShowPostsBtn.module.css';

export default function ShowPostsBtn({ text, onClick }) {
  console.count('ShowPosts-button render');
  return (
    <button className={css.postsShowBtn} onClick={onClick}>
      {text}
    </button>
  );
}
