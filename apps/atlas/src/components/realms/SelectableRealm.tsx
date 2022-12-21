import clsx from 'clsx';
import { RealmStatus } from '@/components/realms/RealmsGetters';
import type { RealmFragmentFragment } from '@/generated/graphql';

type SelectableRealmProps = {
  realm: RealmFragmentFragment;
  isSelected: boolean;
  onSelect: (val: number) => void;
};

export function SelectableRealm(props: SelectableRealmProps) {
  const { realm, isSelected, onSelect } = props;

  function selectRealm() {
    onSelect(realm.realmId);
  }

  return (
    <button
      className="flex flex-wrap justify-between w-full h-auto max-w-full mb-2 overflow-x-auto rounded cursor-pointer"
      onClick={selectRealm}
    >
      <div
        className={clsx(
          `flex w-full p-2  shadow-inner rounded-t-l`,
          isSelected ? `bg-gray-800/60` : `bg-gray-1000/40`
        )}
      >
        <div
          className={`flex self-center ml-2 justify-center items-center w-8 h-8 bg-gray-1000 rounded border-2 border-gray-600`}
        >
          <span className="text-white/100">{isSelected ? `✔️` : ``}</span>
        </div>
        <h3 className="self-center mb-1 ml-4">
          <span className="mr-4 text-gray-400">{realm.realmId} | </span>
          {realm.name}
        </h3>
        <h4 className="self-center justify-end hidden p-1 px-4 text-xs text-gray-400 rounded sm:block">
          {RealmStatus(realm)}
        </h4>
      </div>
    </button>
  );
}
