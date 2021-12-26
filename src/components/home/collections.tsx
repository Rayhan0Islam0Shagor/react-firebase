import { FC, useRef, useEffect, useCallback } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import Card from 'components/global/Card';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { ICollection } from 'types';
import { paginate, remove } from 'redux/slices/collectionSlice';
import { removeCollection, lastDoc } from 'actions/collectionActions';
import { BigLoading } from 'components/global/Loading';

interface IProps {
  dataEdit?: ICollection;
  setDataEdit: (dataEdit?: ICollection) => void;
}

const Collections: FC<IProps> = ({ dataEdit, setDataEdit }) => {
  const loadRef = useRef(null);

  const { collections, loading, stop } = useAppSelector(
    (state) => state.collection
  );

  const dispatch = useAppDispatch();

  const handleDelete = (data?: ICollection) => {
    if (!data) return;

    if (window.confirm('Are you sure want to delete this collection')) {
      dispatch(remove(data));
      removeCollection(data);
    }
  };

  const handleLoadMore = useCallback(() => {
    if (stop === 0) return;
    dispatch(paginate({ doc: lastDoc }));
  }, [dispatch, stop]);

  useEffect(() => {
    const btn = loadRef.current;

    const observer = new IntersectionObserver((entires) => {
      if (entires[0].isIntersecting) {
        handleLoadMore();
      }
    });

    if (btn) observer.observe(btn);

    return () => {
      if (btn) observer.unobserve(btn);
    };
  }, [handleLoadMore]);

  return (
    <div className="bg-gray-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl py-16 mx-auto sm:py-24 lg:pt-10 lg:pb-32 lg:max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
          {loading && <BigLoading />}
          <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6 gap-y-8">
            {/* Card */}
            {collections.map((collection) => (
              <Card
                key={collection.id}
                collection={collection}
                setDataEdit={setDataEdit}
                handleDelete={handleDelete}
              >
                <AiFillEdit className="hidden mx-2 cursor-pointer hover:text-blue-500 w-7 text-opacity-80 group-hover:block" />

                <BsFillTrashFill className="hidden cursor-pointer hover:text-red-500 w-7 text-opacity-80 group-hover:block" />
              </Card>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`px-6 grid items-center py-2 border-2 opacity-0 ${
          stop === 0 && 'hidden'
        }`}
        onClick={handleLoadMore}
        ref={loadRef}
      >
        Load more
      </button>
    </div>
  );
};

export default Collections;
