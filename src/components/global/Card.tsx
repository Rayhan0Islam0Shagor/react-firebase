import React from 'react';
import { Link } from 'react-router-dom';
import { ICollection } from 'types';
import Carousel from 'react-multi-carousel';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';

interface IProps {
  collection: ICollection;
  setDataEdit: (dataEdit?: ICollection) => void;
  handleDelete: (data?: ICollection) => void;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Card: React.FC<IProps> = ({ collection, setDataEdit, handleDelete }) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="relative group">
      <div className="relative w-full overflow-hidden bg-white rounded-lg h-80 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
        <>
          {collection?.photos && collection?.photos.length < 2 && (
            <>
              {collection?.photos.map((photo, i) => (
                <Link
                  to={`/collection/${collection.id}`}
                  key={i}
                  className="h-full"
                >
                  <img
                    src={photo}
                    alt={collection?.title}
                    className="object-cover object-center w-full h-full"
                    onLoad={() => {
                      setLoading(false);
                    }}
                  />
                  {loading && (
                    <div className="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100" />
                  )}
                </Link>
              ))}
            </>
          )}
        </>

        {collection?.photos && collection?.photos.length > 1 && (
          <Carousel
            responsive={responsive}
            swipeable={false}
            draggable={false}
            showDots={false}
            infinite={true}
            customTransition="all 0.5s ease-in-out"
            transitionDuration={200}
            removeArrowOnDeviceType={['mobile', 'tablet']}
          >
            {collection.photos.map((photo, i) => (
              <Link
                to={`/collection/${collection.id}`}
                key={i}
                className="h-full"
              >
                <img
                  src={photo}
                  alt={collection?.title}
                  className="object-cover object-center w-full h-full"
                  onLoad={() => {
                    setLoading(false);
                  }}
                />
                {loading && (
                  <div className="absolute w-full h-full top-0 left-0 animate-pulse bg-gray-100" />
                )}
              </Link>
            ))}
          </Carousel>
        )}
      </div>
      <div className="flex mt-1 mb-3 font-semibold">
        <h2 className="text-xl text-gray-900">
          {loading ? (
            <span className="block w-full bg-gray-100 animate-pulse">
              loading
            </span>
          ) : (
            <>{collection?.title}</>
          )}
        </h2>
        {/* {children} */}
        <div className="absolute flex space-x-2 top-2 right-2">
          <AiFillEdit
            onClick={() => setDataEdit(collection)}
            className="hidden h-7 text-gray-300 mx-2 cursor-pointer hover:text-blue-500 w-7 text-opacity-80 group-hover:block"
          />

          <BsFillTrashFill
            onClick={() => handleDelete(collection)}
            className="hidden h-7 text-gray-300 cursor-pointer hover:text-red-500 w-7 text-opacity-80 group-hover:block"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
