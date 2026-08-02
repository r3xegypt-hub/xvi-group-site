// XVI GROUP — Premium Burger Toggle
// Animated hamburger icon with smooth transition

interface BurgerProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
  ariaExpanded?: boolean;
}

export function Burger({ isOpen: _isOpen, onClick, className, ariaLabel, ariaExpanded }: BurgerProps) {
  return (
    <button
      className={[className, 'xvi-burger'].filter(Boolean).join(' ')}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      type="button"
    >
      <span className="xvi-burger__line xvi-burger__line--1" />
      <span className="xvi-burger__line xvi-burger__line--2" />
      <span className="xvi-burger__line xvi-burger__line--3" />
    </button>
  );
}
