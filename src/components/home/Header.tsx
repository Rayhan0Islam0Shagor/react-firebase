import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { sortBy } from 'redux/slices/collectionSlice';

const Header = () => {
  const { sort } = useAppSelector((state) => state.collection);
  const dispatch = useAppDispatch();

  const isAction = (s: string) => {
    if (s === sort) return 'bg-black text-white';
  };

  const handleSort = (s: string) => {
    // dispatch action
    dispatch(sortBy({ sort: s }));
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold uppercase">My Collections</h2>
      <div>
        <button
          onClick={() => handleSort('asc')}
          className={`px-2 mx-1 border ${isAction('asc')}`}
        >
          ASC
        </button>
        <button
          onClick={() => handleSort('desc')}
          className={`px-2 mx-1 border ${isAction('desc')}`}
        >
          DESC
        </button>
      </div>
    </div>
  );
};

export default Header;
