import { Link } from 'react-router-dom';
import { Button, ButtonVariants } from '@/atoms/Button';

interface NavigationItemProps {
  path: string;
  name: string;
  isActive: boolean;
}

export function NavigationItem({
  path,
  name,
  isActive,
  ...props
}: NavigationItemProps) {
  return (
    <Link to={path} className="flex items-center" {...props}>
      <Button
        variant={isActive ? ButtonVariants.Outline : ButtonVariants.Secondary}
      >
        {name}
      </Button>
    </Link>
  );
}
