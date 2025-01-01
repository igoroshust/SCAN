import React, { useState, useEffect, useMemo } from 'react';
import DocumentCard from '../DocumentCard/DocumentCard';

import cardOne from '../../../assets/images/result/card-one-full-result.png';
import cardTwo from '../../../assets/images/result/card-two-full-result.png';

const DocumentCardList = React.memo(({ documentsData }) => {

    const [documents, setDocuments] = useState([]);
    const [shownDocuments, setShownDocuments] = useState(10); // Количество отображаемых документов

    // Массив изображений
    const cardImages = [cardOne, cardTwo];

    useEffect(() => {
        // Проверяем, существует ли documentsData и является ли он массивом
        if (documentsData && Array.isArray(documentsData)) {

            // Преобразовываем данные
            const convertedDocuments = documentsData.map(doc => ({
                date: new Date(doc.ok.issueDate).toLocaleDateString("ru-RU"),
                sourceName: doc.ok.source.name,
                title: doc.ok.title.text,
                isTechNews: doc.ok.attributes.isTechNews,
                isAnnouncement: doc.ok.attributes.isAnnouncement,
                isDigest: doc.ok.attributes.isDigest,
                image: cardImages[Math.floor(Math.random() * cardImages.length)],
                content: doc.ok.content.markup,
                url: doc.ok.url,
                wordCount: doc.ok.attributes.wordCount,
            }));

            // Устанавливаем состояние
            setDocuments(convertedDocuments);
        }
    }, [documentsData]); // Выполняем каждый раз, когда значение documentsData изменяется

    // Получаем необходимые для отображения документы
    const renderedDocuments = useMemo(() => {

        return documents.slice(0, shownDocuments).map((document, index) => (
            <DocumentCard key={index} {...document} />
        ));
    }, [documents, shownDocuments]); // Если массив документов или их количество изменится, обновляем значение

    // Подгрузка документов
    const showMoreDocuments = () => {
        setShownDocuments(prev => prev + 10);
    };

    return (
        <section className="documents">
            <h3 className="documents__title paragraph-30">Список документов</h3>

                <div className="documents__column">



                     <div className="documents__row">
                        {renderedDocuments}
                     </div>

                {shownDocuments < documents.length && (
                    <button
                        className="btn documents__btn documents__btn_show-more paragraph-22-500-white"
                        onClick={showMoreDocuments}>
                        Показать больше
                    </button>
                )}
                </div>
        </section>
    );
});

export default DocumentCardList;