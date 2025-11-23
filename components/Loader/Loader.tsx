import css from "./Loader.module.css";

function Loader() {
  return (
    <div className={css.loaderBox}>
      <span className={css.loader}></span>
    </div>
  );
}

export default Loader;
