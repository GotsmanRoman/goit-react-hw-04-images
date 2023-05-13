import React, { useEffect, useState } from 'react';

import { Container } from '../App.module';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchAPI } from './utils/API';

import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '280px',
  position: 'center-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '100px',
  clickToClose: true,
});
function showError(valueToFade = '2000') {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      timeout: valueToFade,
    }
  );
}

function Gallery() {
  const perPage = 12;
  const [array, setArray] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, eventModal] = useState(false);
  const [currentElement, setCurrentElement] = useState(null);
  const [currentLoadedQuantity, setCurrentLoadedQuantity] = useState(0);
  const [totalResultQuantity, setTotalResultQuantity] = useState('none');
  const [loading, toggleLoading] = useState(false);

  useEffect(() => {
    if (query === '') return;
    getImages();
  }, [query, page]);

  const isResponseOk = async response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    } else if (response.data.total === 0) {
      showError();
      toggleLoading(false);
      return false;
    }
    return response.data;
  };

  const handleMore = async () => {
    setPage(page + 1);
  };
  const handlerFormSubmit = search => {
    setQuery(search);
    setArray([]);
    setPage(1);
    toggleLoading(false);
    setCurrentLoadedQuantity(0);
  };
  const getImages = async () => {
    toggleLoading(true);
    const resultAPI = await fetchAPI(query, page, perPage);

    const responseParsed = await isResponseOk(resultAPI);
    if (responseParsed !== false) {
      toggleLoading(false);
      setArray([...array, ...responseParsed.hits]);
      setTotalResultQuantity(responseParsed.totalHits);
      setCurrentLoadedQuantity(
        currentLoadedQuantity + responseParsed.hits.length
      );
    }
  };

  const toggleModal = (event, currentElement) => {
    setCurrentElement(currentElement);
    eventModal(!showModal);
  };

  return (
    <Container>
      {showModal && (
        <Modal onClick={toggleModal} currentElement={currentElement} />
      )}
      <Searchbar onSubmit={handlerFormSubmit} />
      <>
        {loading ? (
          <Loader></Loader>
        ) : (
          <ImageGallery array={array} onClick={toggleModal} />
        )}
      </>
      {array.length !== 0 && currentLoadedQuantity !== totalResultQuantity ? (
        <Button onClick={() => handleMore} />
      ) : (
        false
      )}
    </Container>
  );
}

export { Gallery };
