import Card from 'components/global/Card';
import { useAppSelector } from 'redux/hooks';

const Collections = () => {
  const { collections } = useAppSelector((state) => state.collection);

  return (
    <div className="bg-gray-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl py-16 mx-auto sm:py-24 lg:pt-10 lg:pb-32 lg:max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
            {/* Card */}
            {collections.map((collection) => (
              <Card key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
