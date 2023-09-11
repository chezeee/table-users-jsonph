import css from './ShowPostsBtn.module.css';

export default function ShowPostsBtn({ text, onClick }) {
  return (
    <button className={css.postsShowBtn} onClick={onClick}>
      {text}
    </button>
  );
}
