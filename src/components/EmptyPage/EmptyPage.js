import "./EmptyPage.scss";

import { Link, useNavigate } from "react-router-dom";

export const EmptyPage = () => {
  const navigate = useNavigate();
  return (
    <main className="empty">
      <div className="empty__container">
        <h1 className="empty__title">404</h1>
        <h2 className="empty__subtitle">Страница не найдена</h2>
      </div>

      <Link className="empty__link" onClick={() => navigate(-1)}>
        Назад
      </Link>
    </main>
  );
};
