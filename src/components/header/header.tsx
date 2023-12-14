import Logo from '../logo/logo.tsx';
import NavigationMenu from '../navigation-menu/navigation-menu.tsx';

function Header() {
  return (
    <header className="header" data-testid="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo/>
          <NavigationMenu/>
        </div>
      </div>
    </header>
  );
}

export default Header;
