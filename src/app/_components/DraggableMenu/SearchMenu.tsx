import classNames from 'classnames';

interface SearchMenuProps {
  isOpenMenu: boolean;
}

export default function SearchMenu({ isOpenMenu }: SearchMenuProps) {
  return <div className={classNames(isOpenMenu ? 'visible' : 'hidden')}>Menu</div>;
}
