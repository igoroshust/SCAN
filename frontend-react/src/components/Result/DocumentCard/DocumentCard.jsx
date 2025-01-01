import React, { useEffect, useState } from 'react';

// Декодирование html-сущностей в обычный текст
function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Очистка html-контента
function cleanHtmlContent(htmlContent) {
  const decodedHtml = decodeHtml(htmlContent);
  const cleanedContent = decodedHtml.replace(/(<([^>]+)>)/gi, "");
  return cleanedContent;
}

const DocumentCard = (props) => {
    const [cleanContent, setCleanContent] = useState('');
    const isActive = Boolean(props.url); // Определяем, активна ли кнопка

    useEffect(() => {
        setCleanContent(cleanHtmlContent(props.content));
    }, [props.content]);

    const badge = props.isTechNews ? "Технические новости" : props.isAnnouncement ? "Анонсы и события" : "Сводки новостей";

    return (
         <div className="documents__card documents__card_card-1">
              <div className="documents-card__container">
                  <div className="documents-card__column">

                      {/* Дата и источник документа */}
                      <div className="documents-card__info">
                          <p className="documents-card__info_paragraph documents-card__info_paragraph-date paragraph-16-gray">{ props.date }</p>
                          <p className="documents-card__info_paragraph documents-card__info_paragraph-source paragraph-16-gray">{ props.sourceName }</p>
                      </div>

                      {/* Заголовок */}
                      <div className="documents-card__title">
                          <p className="documents-card__title paragraph-26-500">{ props.title }</p>
                      </div>

                      {/* Категория (бэйджик) */}
                      <div className="documents-card__badge">
                          <p className="documents-card__badge documents-card__badge-technical-news paragraph-12">{ badge }</p>
                      </div>

                      {/* Изображение */}
                      <div className="documents-card__img">
                          <img src={props.image} alt="СКАН изображение документа" />
                      </div>

                      {/* Текст */}
                      <div className="documents-card__content">
                          <p className="documents-card__paragraph paragraph-16-gray">{ cleanContent }</p>
                      </div>

                      {/* Читать в источнике + счётчик слов */}
                      <div className="documents-card__footer">
                          {props.url ? (
                          <a className="btn documents-card__footer-btn paragraph-16-black" href={props.url} target='_blank' rel="noopener noreferrer">Читать в источнике</a>
                           ) : (
                          <a className={`btn documents-card__footer-btn paragraph-16-black disabled`} style={{ opacity: 0.5 }}>Читать в источнике</a>
                             )}
                          <p className="documents-card__footer-paragraph paragraph-16-gray">{ props.wordCount } слов</p>
                      </div>

                  </div>
              </div>
         </div>
    );
};

export default DocumentCard;