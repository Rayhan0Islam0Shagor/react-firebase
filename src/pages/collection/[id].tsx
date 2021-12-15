import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useHistory, useParams } from 'react-router-dom';
import { IParams, ICollection } from 'types';
import { getCollection } from 'actions/collectionActions';
import { useAppSelector } from 'redux/hooks';

const Collection = () => {
  const { id } = useParams<IParams>();
  const history = useHistory();

  const [collection, setCollection] = useState<ICollection>();
  const [selectedImage, setSelectedImage] = useState('');

  const { collections } = useAppSelector((state) => state.collection);

  useEffect(() => {
    if (!id) return;

    let here = true;
    const collection = collections.find((collection) => collection.id === id);
    if (collection) {
      setCollection(collection);
    } else {
      getCollection(id).then((res) => {
        if (here) setCollection(res as ICollection);
      });
    }

    return () => {
      here = false;
    };
  }, [id, collections]);

  return (
    <div className="relative bg-gray-100">
      <div
        className="absolute top-2 left-2 cursor-pointer hover:scale-105"
        onClick={() => history.goBack()}
      >
        <BiArrowBack className="text-gray-900 w-6 h-6 " />
      </div>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl py-16 mx-auto sm:py-24 lg:pt-16 lg:pb-32 lg:max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 capitalize">
            {collection?.title}
          </h2>

          <div className="mt-4 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
            {collection?.photos?.map((img, i) => (
              <div key={i} className="relative group">
                <div
                  className="relative w-full my-2 overflow-hidden bg-white rounded-lg h-80 group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1 cursor-pointer"
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={img}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BigImage */}
      {selectedImage && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-white rounded-md">
          <img
            className="object-contain w-full h-full"
            src={selectedImage}
            alt="view img"
          />

          <div className="absolute top-0 right-0 flex">
            <button
              className="px-6 py-1 mx-2 bg-white border-2 border-gray-400 rounded-md"
              onClick={() => setSelectedImage('')}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* BigImage */}
    </div>
  );
};

export default Collection;
