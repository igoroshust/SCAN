import React, { useEffect, useState } from 'react';


function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function cleanHtmlContent(htmlContent) {
  const decodedHtml = decodeHtml(htmlContent);
  const cleanedContent = decodedHtml.replace(/(<([^>]+)>)/gi, "");
  return cleanedContent;
}

const DocumentCard = (props) => {

    const [cleanContent, setCleanContent] = useState('');

    useEffect(() => {
        setCleanContent(cleanHtmlContent(props.content));
    }, [props.content]);

    const badge = props.isTechnicalNews ? "Технические новости" : props.isAnnouncement ? "Анонсы и события" : "Сводки новостей";

    return (
         <div className="documents__card documents__card_card-1">
              <div className="documents-card__container">
                  <div className="documents-card__column">

                      {/* Дата и источник документа */}
                      <div className="documents-card__info">
                          <p className="documents-card__info_paragraph documents-card__info_paragraph-date paragraph-16-gray">{ props.date }</p>
                          <a className="anchor-gray documents-card__info_paragraph documents-card__info_paragraph-source paragraph-16-gray">{ props.sourceName }</a>
                      </div>

                      {/* Заголовок */}
                      <div className="documents-card__title">
                          <p className="documents-card__title paragraph-26-500">{ props.title }</p>
                      </div>

                      {/* Категория (бэйджик) */}
                      <div className="documents-card__badge">
                          <p className="documents-card__badge documents-card__badge-technical-news paragraph-12">{ props.badge }</p>
                      </div>

                      {/* Изображение */}
                      <div className="documents-card__img">
                          <img src={props.img} alt="СКАН изображение документа" />
                      </div>

                      {/* Текст */}
                      <div className="documents-card__content">
                          <p className="documents-card__paragraph paragraph-16-gray">{ cleanContent }</p>
                      </div>

                      {/* Читать в источнике + счётчик слов */}
                      <div className="documents-card__footer">
                          <a className="btn documents-card__footer-btn paragraph-16-black" href={props.url} target='_blank' rel="noopener noreferrer">Читать в источнике</a>
                          <p className="documents-card__footer-paragraph paragraph-16-gray">{ props.wordCount }</p>
                      </div>

                  </div>
              </div>
         </div>
    );
};

export default DocumentCard;