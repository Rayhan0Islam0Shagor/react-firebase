import { FC } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import Card from 'components/global/Card';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { ICollection } from 'types';
import { remove } from 'redux/slices/collectionSlice';
import { removeCollection } from 'actions/collectionActions';

interface IProps {
  dataEdit?: ICollection;
  setDataEdit: (dataEdit?: ICollection) => void;
}

const Collections: FC<IProps> = ({ dataEdit, setDataEdit }) => {
  const { collections, loading } = useAppSelector((state) => state.collection);

  const dispatch = useAppDispatch();

  const handleDelete = (data?: ICollection) => {
    if (!data) return;

    if (window.confirm('Are you sure want to delete this collection')) {
      dispatch(remove(data));
      removeCollection(data);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl py-16 mx-auto sm:py-24 lg:pt-10 lg:pb-32 lg:max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
          {loading && <h2>Loading...</h2>}
          <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
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
    </div>
  );
};

export default Collections;
